import {getOfferById} from "../../reducer/data/selectors";
import {getActiveOffer, getCurrentOffer} from "../../reducer/app/selectors";
import {connect} from "react-redux";
import Map from "./map";

const mapStateToProps = (state) => ({
  activeOffer: getOfferById(state, getActiveOffer(state)),
  currentOffer: getOfferById(state, getCurrentOffer(state)),
});

export default connect(mapStateToProps)(Map);
