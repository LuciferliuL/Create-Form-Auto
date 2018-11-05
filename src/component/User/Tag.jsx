import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Tag} from 'antd'
import { addTabs, delTabs, addTable, delTable } from './User.action'


const CheckableTag = Tag.CheckableTag;


class Tags extends Component {
    state = {
        selectedTags: [],
    }
    handleChange(tag, checked) {
        this.setState({ selectedTags: [tag] });
      }
    render() {
        const {selectedTags} = this.state

        let data = []
        this.props.TabsData.map(tag => (
            data.push(
                <CheckableTag
                key={tag['Name']}
                checked={selectedTags[0] === tag['Name'] ? true : false}
                onChange={checked => this.handleChange(tag['Name'], checked)}
            >
                {tag['Name']}
            </CheckableTag>
            )
        ))


        return (
            <div>
                {data}
            </div>

        );
    }
}

function mapStateToProps(State) {
    console.log(State);

    return {
        TableList: State.TableList,
        TabsData: State.TabsData
    };
}
const mapDispatchProps = (dispatch) => {
    return {
        addTabs: (value) => {
            dispatch(addTabs(value))
        },
        delTabs: (key) => {
            dispatch(delTabs(key))
        },
        addTable: (value) => {
            dispatch(addTable(value))
        },
        delTable: (key) => {
            dispatch(delTable(key))
        }
    }
}

export default connect(  mapStateToProps,mapDispatchProps
)(Tags);