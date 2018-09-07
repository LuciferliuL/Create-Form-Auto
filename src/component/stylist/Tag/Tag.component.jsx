import React, { Component } from 'react';
import { Icon ,Input} from 'antd'
import { DraggableAreasGroup } from 'react-draggable-tags';
import './Tag.css'

const group = new DraggableAreasGroup();
const DraggableArea = group.addArea();

class Tagcomponent extends Component {
    state = {
        initialTags: [
            { id: 11, name: 'apple' }, { id: 21, name: 'watermelon' }, { id: 31, name: 'banana' },
            { id: 41, name: 'lemon' }, { id: 51, name: 'orange' }, { id: 61, name: 'grape' },
            { id: 81, name: 'cherry' }, { id: 91, name: 'peach' }]
    }

    render() {
        return (
            <div>
                <DraggableArea
                    initialTags={this.state.initialTags}
                    render={({ tag, deleteThis }) => (
                        <div className="tagTag">
                            <Icon
                                className="DeleteTag"
                                type="minus-square"
                                theme="filled"
                                onClick={deleteThis} />
                            <Input type="text" placeholder={tag.name} />
                        </div>
                    )}
                    getAddTagFunc={addTag => this.addTag = addTag}
                    onChange={(tags) => console.log(tags)}
                />
            </div>
        );
    }
}

export default Tagcomponent;