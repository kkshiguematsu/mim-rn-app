import { PageRoot } from './Page';
import { PageHeader } from './PageHeader';
import { PageKeyboard } from './PageKeyboard';
import { PageScroll } from './PageScroll';
import { PagesStickyHeader } from './PagesStickyHeader';

export const Page = Object.assign(PageRoot, {
  Scroll: PageScroll,
  Header: PageHeader,
  StickyHeader: PagesStickyHeader,
  Keyboard: PageKeyboard,
});
