import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default function Header({
  flyTitle,
  smallMode,
  title,
  text,
  itemType = 'http://schema.org/Article',
  itemProp = 'article',
  className,
  children,
  link,
} = {}) {
  if (link) {
    title = <a {...link} className="header__title-link">{title}</a>;
  }
  const headerContent = [];
  if (flyTitle && !smallMode) {
    headerContent.push((
      <h2
        className="header__flytitle"
        itemProp="alternativeHeadline"
        key="flytitle"
      >{flyTitle}</h2>
    ));
  }
  headerContent.push(<h1 className="header__title" itemProp="headline" key="title">{title}</h1>);
  if (text && !smallMode) {
    /* eslint-disable react/no-danger */
    headerContent.push((
      <div
        className="header__text"
        itemProp="description"
        key="text"
        dangerouslySetInnerHTML={{
          '__html': text,
        }}
      />));
    /* eslint-enable react/no-danger */
  }
  if (children) {
    headerContent.push((
      <div
        className="header__additional-element"
        key="additional"
      >
        {children}
      </div>));
  }
  return (
    <header
      className={classNames(
        'header',
        className,
        {
          'header--small-mode': Boolean(smallMode) === true,
          'header--large-mode': Boolean(smallMode) === false,
        }
      )}
      itemScope
      itemType={itemType}
      itemProp={itemProp}
      role="header"
    >
      <div className="header__wrapper">
        <div className="header__content">
          {headerContent}
        </div>
      </div>
    </header>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Header.propTypes = {
    flyTitle: PropTypes.string,
    smallMode: PropTypes.bool,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    itemType: PropTypes.string,
    itemProp: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    link: PropTypes.shape({
      className: PropTypes.string,
      href: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  };
}
