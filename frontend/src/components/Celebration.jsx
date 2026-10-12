import { Hearts } from './Hearts.jsx';

export function Celebration() {
  return (
    <section className="stage">
      <Hearts />
      <div className="content celebrate">
        <p className="eyebrow">You said yes</p>
        <h1 className="prompt">I will be counting the minutes until I see you.</h1>
        <p className="closer">Save me that kiss.</p>
      </div>
    </section>
  );
}
