import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
  const onClick = (object) => {
    console.log(object)
  }
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color='green' text='Add' onClick={onClick} />
    </header>
  )
}

// Default prop for above H1 if nothing in App.js
Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS below
// const headingStyle = {
//   color: 'red', 
//   backgroundColor: 'black'
// }

export default Header