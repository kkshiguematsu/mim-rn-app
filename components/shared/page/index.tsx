import { PageRoot } from './Page';
import { PageHeader } from './PageHeader';
import { PageKeyboard } from './PageKeyboard';
import { PageScroll } from './PageScroll';

export const Page = Object.assign(PageRoot, {
  Scroll: PageScroll,
  Header: PageHeader,
  Keyboard: PageKeyboard,
});
