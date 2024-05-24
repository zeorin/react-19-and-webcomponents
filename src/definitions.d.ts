// Put this in a project-wide .d.ts file, or if publishing a library there are
// other ways to merge into React's types

import type { SchalkExampleJSXIntrinsicElement } from './schalk-example.ts'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends SchalkExampleJSXIntrinsicElement {}
  }
}
