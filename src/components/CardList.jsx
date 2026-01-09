import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards, setDefaultCard, deleteCard } from '../actions/cardActions';

const CardsList = () => {
  const dispatch = useDispatch();
  const { cards, loading, error } = useSelector(state => state.cards);
  const userId = useSelector(state => state.auth.user.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCards(userId));
    }
  }, [dispatch, userId]);

  const handleSetDefault = (cardId) => {
    dispatch(setDefaultCard(userId, cardId));
  };

  const handleDelete = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(deleteCard(userId, cardId));
    }
  };

  if (loading) return <div>Loading cards...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cards-list">
      <h2>Your Payment Methods</h2>
      
      {cards.length === 0 ? (
        <p>No cards added yet</p>
      ) : (
        <ul>
          {cards.map(card => (
            <li key={card._id} className={card.isDefault ? 'default-card' : ''}>
              <div className="card-info">
                <div className="card-type">{card.cardType.toUpperCase()}</div>
                <div className="card-number">{card.cardNumber}</div>
                <div className="card-expiry">
                  Expires: {new Date(card.expiryDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}
                </div>
                {card.nickname && <div className="card-nickname">{card.nickname}</div>}
              </div>
              
              <div className="card-actions">
                {!card.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(card._id)}
                    className="btn-set-default"
                  >
                    Set as Default
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(card._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardsList;