import { useRef } from 'react';
import { Hearts } from './Hearts.jsx';
import { useNoButton } from '../hooks/useNoButton.js';

export function QuestionSlide({ question, index, total, onYes }) {
  const yesRef = useRef(null);
  const { noRef, spot, covered, yesScale, noScale, onNoPointerDown } = useNoButton(yesRef);

  const noStyle = spot
    ? {
        left: `${spot.x}px`,
        top: `${spot.y}px`,
        transform: `translate(-50%, -50%) scale(${noScale})`,
        transition: spot.instant ? 'none' : undefined,
        pointerEvents: covered ? 'none' : 'auto',
      }
    : undefined;

  return (
    <section className="stage">
      <Hearts />
      <div className="content">
        <p className="eyebrow">{question.eyebrow}</p>
        <h1 className="prompt" key={question.id}>
          {question.prompt}
        </h1>
        <p className="progress">
          {index + 1} of {total}
        </p>
        <div className="actions">
          <button
            ref={yesRef}
            type="button"
            className="choice choice-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={onYes}
          >
            Yes
          </button>
          <button
            ref={noRef}
            type="button"
            className={spot ? 'choice choice-no is-dodging' : 'choice choice-no'}
            style={noStyle}
            tabIndex={covered ? -1 : 0}
            aria-hidden={covered || undefined}
            onPointerDown={onNoPointerDown}
            onClick={(event) => event.preventDefault()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const rect = event.currentTarget.getBoundingClientRect();
                onNoPointerDown({
                  preventDefault() {},
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                });
              }
            }}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}
