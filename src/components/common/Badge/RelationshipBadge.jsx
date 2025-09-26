import PropTypes from 'prop-types';

export function RelationshipBadge({ type, children }) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-lg px-2 py-0.5 font-16-regular';

  const variantStyles = {
    friend: 'bg-blue-100 text-blue-600',
    family: 'bg-green-100 text-green-600',
    coworker: 'bg-purple-100 text-purple-600',
    other: 'bg-orange-100 text-orange-600',
  };

  return (
    <span
      className={[baseStyle, variantStyles[type]].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}

RelationshipBadge.propTypes = {
  type: PropTypes.oneOf(['friend', 'family', 'coworker', 'other']).isRequired,
  children: PropTypes.node.isRequired,
};
