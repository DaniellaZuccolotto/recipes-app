import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ path, id }) {
  const [copied, setCopied] = useState(false);

  const shareRecipe = () => {
    navigator.clipboard.writeText(`http://localhost:3000${path}`);
    setCopied(true);
  };

  useEffect(() => {
    const clearCopied = () => {
      const TIME = 3000;
      setTimeout(() => {
        if (copied) setCopied(false);
      }, TIME);
    };

    clearCopied();
  }, [copied]);

  return (
    <div>
      <input
        type="image"
        src={ shareIcon }
        alt="Botão de compartilhamento"
        data-testid={ id ? `${id}-horizontal-image` : 'share-btn' }
        onClick={ shareRecipe }
      />
      {
        copied && (
          <p>Link copied!</p>
        )
      }
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.number,
};

ShareButton.defaultProps = {
  id: null,
};

export default ShareButton;
