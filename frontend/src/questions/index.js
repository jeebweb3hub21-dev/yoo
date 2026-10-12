import { AgainQuestion } from './AgainQuestion.jsx';
import { CuteQuestion } from './CuteQuestion.jsx';
import { KissQuestion } from './KissQuestion.jsx';
import { LikeMeQuestion } from './LikeMeQuestion.jsx';
import { SmileQuestion } from './SmileQuestion.jsx';

/**
 * Edit this list to change the questions, their order, or how many there are.
 * The last item should stay the closing question. Each `Component` is the
 * slide for that question — see the matching file in this folder.
 */
export const questions = [
  {
    id: 'like-me',
    eyebrow: 'For you',
    prompt: 'Do you like me?',
    Component: LikeMeQuestion,
  },
  {
    id: 'cute',
    eyebrow: 'Be honest',
    prompt: 'Do you think I am cute?',
    Component: CuteQuestion,
  },
  {
    id: 'smile',
    eyebrow: 'I have a theory',
    prompt: 'Do you smile when I text you?',
    Component: SmileQuestion,
  },
  {
    id: 'again',
    eyebrow: 'One more',
    prompt: 'Would you choose me all over again?',
    Component: AgainQuestion,
  },
  {
    id: 'kiss',
    eyebrow: 'Last one',
    prompt: 'Will you kiss me when we next meet?',
    Component: KissQuestion,
  },
];
