import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ path, data }) {
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
    <div className="w-[30px] flex justify-center ml-4">
      <input
        type="image"
        src={ shareIcon }
        alt="Botão de compartilhamento"
        data-testid={ data }
        onClick={ shareRecipe }
        className="left-0"
      />
      {
        copied && (
          <p
            className="bg-red-800 z-0 absolute top-auto right-auto w-[140px] h-[30px]
            rounded-md flex flex-col justify-center items-center font-bold text-white
            opacity-90"
          >
            Link copied!
          </p>
        )
      }
    </div>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default ShareButton;
