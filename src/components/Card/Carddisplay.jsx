
import { CreditCard } from 'lucide-react';

const Carddisplay = ({ cardNumber, cardHolder, expiryDate, cvv, focused,}) => {
    const getCardType = () => {

        if (!cardNumber || typeof cardNumber !== 'string') return 'Unknown';

        const firstDigit = cardNumber.charAt(0);
        const firstTwoDigits = cardNumber.substring(0, 2);

    
        if (firstDigit.startsWith('4')) return 'visa';
        if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'mastercard';
        if (['50'].includes(firstTwoDigits)) return 'Rupay';
        if (['34', '37'].includes(firstTwoDigits)) return 'amex';
        if (['60', '65'].includes(firstTwoDigits) || firstDigit === '6') return 'discover';

        return 'generic';
    };

    const cardType = getCardType();

    const getCardTypeColor = () => {
        switch (cardType) {
            case 'visa': return 'bg-blue-600';
            case 'mastercard': return 'bg-orange-600';
            case 'amex': return 'bg-green-600';
            case 'discover': return 'bg-purple-600';
            case 'Rupay': return 'bg-blue-800';
            default: return 'bg-gray-700';
        }
    };

    const formatCardNumber = (number) => {
        const groups = [];
        for (let i = 0; i < 16; i += 4) {
            const group = number.slice(i, i + 4).padEnd(4, '•');
            groups.push(group);
        }
        return groups.join(' ');
    };

    return (
        <div className={`relative w-[420px] h-56 rounded-xl p-6 overflow-hidden shadow-lg transition-all duration-300 ${focused ? 'scale-105' : 'scale-100'
            } ${getCardTypeColor()}`}>
            {/* Card background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5">
                    <div className="w-96 h-96 rounded-full bg-white absolute -top-12 -right-12 opacity-10"></div>
                    <div className="w-96 h-96 rounded-full bg-white absolute -bottom-24 -left-12 opacity-10"></div>
                </div>
            </div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col h-full text-white">
                <div className="flex justify-between items-start">
                    <div className="text-lg font-semibold tracking-wider">
                        {cardType !== 'generic' ? cardType.toUpperCase() : 'CARD'}
                    </div>
                    <CreditCard size={32} />
                </div>

                <div className={`mt-8 mb-6 text-2xl font-mono tracking-wider ${focused === 'cardNumber' ? 'opacity-100' : 'opacity-90'}`}>
                    {cardNumber ? formatCardNumber(cardNumber) : '•••• •••• •••• ••••'}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className={`${focused === 'cardHolder' ? 'opacity-100' : 'opacity-90'}`}>
                        <div className="text-xs opacity-80 mb-1">CARD HOLDER</div>
                        <div className="font-medium truncate">
                            {cardHolder || 'YOUR NAME'}
                        </div>
                    </div>

                    <div className={`${focused === 'expiryDate' ? 'opacity-100' : 'opacity-90'}`}>
                        <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                        <div className="font-medium">
                            {expiryDate || 'MM/YY'}
                        </div>
                    </div>
                </div>


            {focused === 'cvv' && (
                <div className="absolute w-[150px] h-8 top-14 right-0 left-56 inset-0  flex items-center justify-center bg-opacity-90 backdrop-blur-sm transition-all duration-300">
                    <div className="text-center text-white">
                        <div className="text-xs opacity-80 ">CVV</div>
                        <div className="text-2xl font-mono tracking-wider ml-2">
                            {cvv || '•••'}
                        </div>
                    </div>
                </div>
            )}

            </div>

            {/* CVV display on back (only shown when CVV is focused) */}
        </div>
    );
};

export default Carddisplay;