import {getSortType} from "../../reducer/app/selectors";
import {ActionCreator} from "../../reducer/app/app";
import {connect} from "react-redux";
import Sorting from "./sorting";

const mapStateToProps = (state) => ({
  sortBy: getSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSortingType(type) {
    dispatch(ActionCreator.setSortingType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
