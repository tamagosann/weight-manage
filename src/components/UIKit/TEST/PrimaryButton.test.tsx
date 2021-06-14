import { render } from '@testing-library/react';
import PrimaryButton from '../PrimaryButton';

test('PrimaryButton test', () => {
  const component = render(<PrimaryButton label={'決定'} onClick={() => {}}/>);
});