import React from 'react';
import './AnswerButton.css';

const AnswerButton = ({answer, correct, isSelected, disable, onClick}) => {
    return (
        <>
            {correct ? (
                <button onClick={onClick} className={isSelected || disable ? 'correctButton' : 'defaultButton'} disabled={disable}>
                    {answer}
                </button>
            ) : (
                <button onClick={onClick} className={isSelected ? 'wrongButton' : 'defaultButton'} disabled={disable}>
                    {answer}
                </button>
            )}
        </>
    )
}

export default AnswerButton