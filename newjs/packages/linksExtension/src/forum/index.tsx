import app from 'flarum/app';
import PrimaryHeader from 'flarum/PrimaryHeader';
import extend from 'flarum/extend';

app.initializers.add('test-links', () => {
  extend(PrimaryHeader, ([PrimaryHeader, props]) => {
    const {items} = props;
    items.push({
      id: 'test',
      title: 'added by extension',
      link: '#',
    });
    return <PrimaryHeader {...props} />;
  });
});
