import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swipe from '../extensions/Swipe';
import * as selectors from '../extensions/router/selectors';
import * as actions from '../extensions/router/actions';
// import { routeChangeRequested } from '../extensions/router/actions';
// import * as selectors from '../extensions/router/selectors'

const list = [
  '000',
  '001',
  '002',
  '003',
  '004',
  '005',
  '006',
  '007',
  '008',
  '009',
  '010',
  '011',
  '012',
  '013',
  '014',
];
const listType = 'posts';

const currentSwipe = {
  list,
  active: 0,
};

const slideColors = [
  'indianred',
  'darkseagreen',
  'cadetblue',
  'salmon',
  'lightyellow',
  'indianred',
  'darkseagreen',
  'cadetblue',
  'salmon',
  'lightyellow',
  'indianred',
  'darkseagreen',
  'cadetblue',
  'salmon',
  'lightyellow',
];

const Slide = ({ index, length }) => (
  <div style={{ fontWeight: 'bold', fontSize: '20px', backgroundColor: slideColors[index] }}>
    {Array(length)
      .fill(0)
      .map((e, num) => (
        <p
          style={{
            margin: 0,
            padding: '10px 0',
            borderTop: '1px solid black',
            textAlign: 'center',
          }}
        >
          {num}
        </p>
      ))}
  </div>
);

class Slider extends Component {
  constructor(props) {
    super(props);

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleChangeIndex({ index, fromProps }) {
    console.log('handleChangeIndex', index, fromProps);
    if (!fromProps) {
      // Update active in current list
      currentSwipe.active = index;

      // dispatch a route change
      console.log('dispatch a route change');
      const currentType = listType;
      const currentId = currentSwipe.list[currentSwipe.active];
      this.props.changeRoute({ currentType, currentId });
    } else {
      // do nothing
      console.log('do nothing');
    }
  }

  render() {
    const { id, slides } = this.props;
    console.log('CURRENT ID IS', id)
    return (
      <Swipe index={currentSwipe.list.indexOf(id)} onChangeIndex={this.handleChangeIndex}>
        {Array(slides)
          .fill(0)
          .map((e, i) => <Slide index={i} length={30} />)}
      </Swipe>
    );
  }
}

Slider.propTypes = {
  slides: PropTypes.number.isRequired,
  // type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  type: selectors.getType(state),
  id: selectors.getId(state),
});

const mapDispatchToProps = dispatch => ({
  changeRoute: typeAndId => dispatch(actions.routeChangeRequested(typeAndId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
