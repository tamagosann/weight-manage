import { render } from '@testing-library/react';
import SecondaryButton from '../SecondaryButton';

test('SecondaryButton test', () => {
  const component = render(<SecondaryButton label={'戻る'} onClick={() => {}}/>);
});