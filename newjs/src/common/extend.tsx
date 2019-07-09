const extendsions = new Map<React.ComponentType<object>, ((p: any) => React.ReactNode)[]>();

export function withExtend<P extends object>(Component: React.ComponentType<P>) {
  return function WithExtend(props: P) {
    const arr = extendsions.get(Component) || [];
    if (arr.length === 0) {
      return <Component {...props} />
    }
    const composed = arr.reduce((a, b) => (...args) => a(b(...args)), arg => arg)
    return composed([Component, props]);
  }
}

export function extend<P extends object>(Component: React.ComponentType<P>, exFn: (props: P) => React.ReactNode) {
  let arr = extendsions.get(Component);
  if (arr) {
    arr.push(exFn);
  } else {
    arr = [exFn];
  }
  extendsions.set(Component, arr);
}
