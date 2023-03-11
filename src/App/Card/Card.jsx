import './Card.css';

// ==> Structure of a shown card on the board
const Card = ({ number, suit }) => {
    const combo = (number) ? `${number}${suit}` : null;
    
    return (
      <td>
        <div className="card">
          { combo }
        </div>
      </td>
    );
};

export default Card;