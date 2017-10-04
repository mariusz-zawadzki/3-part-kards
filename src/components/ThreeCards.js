import React from 'react'
import Pages from './3_cards/Pages'

export default class ThreeCards extends React.Component{
    render(){
        console.log(this.props)
        return (
            <Pages />
        );
    }
}