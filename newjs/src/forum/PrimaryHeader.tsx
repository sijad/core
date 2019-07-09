import { withExtend } from '../common/extend';

interface LinkItem {
  id: string;
  title: string;
  link: string;
}

interface Props {
  items?: LinkItem[];
}

export function PrimaryHeader({items}: Props) {
  return (
    <div id="header-primary" className="Header-primary">
      <ul className="Header-controls">
        {items && items.map(({id, title, link}) => (
          <li key={id} className={`item-${id}`}><a className="LinksButton Button Button--link" href={link} title={title}>{title}</a></li>
        ))}
    </ul>
    </div>
  );
}

export default withExtend<Props>(PrimaryHeader);

