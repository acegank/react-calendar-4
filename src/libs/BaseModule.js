import React, {Component}from 'react'
import util from './util'
import url from './url'



export default class BaseModule extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        this.query = props.location ? props.location.query :  url.query()
        this.util = util
    }
};
