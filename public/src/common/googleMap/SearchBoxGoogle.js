/**
 * Created by caoquang on 10/10/2017.
 */
import React, {Component} from "react"
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
} from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";


const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD0UDOSXZ0ljbOgf62pW8oOuKXt5dwjm-k&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px`, marginBottom: `50px` }} />,
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="" style={{ marginBottom: `50px` }}>
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="choose your address"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </StandaloneSearchBox>

    </div>
);


class MyFancyComponent extends Component {

    componentWillMount() {
        const refs = {}

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {
                refs.searchBox = ref;
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                this.props.onPlacesChanged(places[0]);
                this.setState({
                    places,
                });
            },
        })
    }

    render() {
        return (
            <PlacesWithStandaloneSearchBox {...this.state} />
        )
    }
}

export default MyFancyComponent