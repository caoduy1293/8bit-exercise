import React from 'react';
import propTypes from 'prop-types';
import {Alert, Button, Input, List, Row, Tabs} from "antd";
import ItemForm from "./ItemForm";

const Search = Input.Search;
const TabPane = Tabs.TabPane;
class ItemFormWrapped extends React.Component{
    state = {
        selectedItem: null,
        searchTerm: {
            title: '',
        },
        searchResult: []
    };

    onCreateBaseOnNasaData = (e) => {
        const {title, url, media_type, date, explanation} = e;
        this.props.onAddEditForm({
            title,
            dateCreated: date,
            previewUrl: url,
            mediaType: media_type,
            description: explanation,
            isFromNasaData: true,
        });
    };

    onSearchArticle = (value) => {
        if(value && value !== this.state.searchTerm.title && this.props.nasaData && this.props.nasaData.length > 0) {
            value = value.toLowerCase();
            let searchResult = [];
            for(let i = 0, item; i < this.props.nasaData.length; i++) {
                item = this.props.nasaData[i];
                let title = item.title.toLowerCase();
                if(title.indexOf(value) > -1) {
                    searchResult.push(item);
                }
            }
            this.setState({searchResult});
        }
    };
    submitItem = (value) => {
        this.props.onAddEditForm(value);
    };
    render() {
        const {
            selectedItem,
            loading,
        } = this.props;
        return (
            <div>
                { selectedItem ?
                    (<ItemForm onSubmit={this.submitItem} selectedItem={selectedItem}
                               loading={loading} onOffSignal={this.props.onOffSignal}/>)
                    : (<Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="NASA Dictionary" key="1">
                                <Row>
                                    {this.props.loadingNasa ? (
                                        <Alert message="Loading article ... " type="info" />
                                    ): ''}

                                    <Search
                                        className={'nasa-search'}
                                        disabled={this.props.loadingNasa}
                                        placeholder="Search article"
                                        onSearch={this.onSearchArticle}
                                        enterButton
                                    />
                                </Row>
                                <Row>
                                    <List
                                        size="small"
                                        dataSource={this.state.searchResult}
                                        renderItem={item => (
                                            <List.Item
                                                actions={[<Button className="editable-add-btn" disabled={this.props.loading}
                                                                  onClick={ ()=> {this.onCreateBaseOnNasaData(item)}}>Add</Button>]}>
                                                <List.Item.Meta title={item.title}/>
                                            </List.Item>
                                        )}
                                    />
                                </Row>
                            </TabPane>
                            <TabPane tab="Manual" key="2">
                                <ItemForm onSubmit={this.submitItem} selectedItem={null}
                                          loading={loading} onOffSignal={this.props.onOffSignal}/>
                            </TabPane>
                        </Tabs>)
                }

            </div>
        );
    }
}

ItemFormWrapped.propTypes = {
    //HOC prop
    selectedItem: propTypes.object,
    nasaData: propTypes.any,
    loading: propTypes.bool,
    onAddEditForm: propTypes.any,
    onGetNasaData: propTypes.func,
    loadingNasa: propTypes.bool,
    onOffSignal: propTypes.bool,
};

export default ItemFormWrapped;