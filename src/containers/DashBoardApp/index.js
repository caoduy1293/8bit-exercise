import React from 'react';
import {Table, Divider, Button, Popconfirm, Modal, Layout, Row, Col} from 'antd';
import propTypes from "prop-types";
import {Helmet} from "react-helmet";
import {compose} from "redux";
import {reset} from 'redux-form';
import {connect} from "react-redux";
import * as moment from 'moment';
import {createStructuredSelector} from "reselect/es";
import {toastr} from 'react-redux-toastr';
import {CSVLink, CSVDownload} from 'react-csv';
import ReactPlayer from 'react-player';

import {itemsRef} from '../../firebase';
import {AUDIO_TYPE, IMAGE_TYPE, SELECTOR_ID_PAGE, VIDEO_TYPE, ITEM_FORM_ID} from "./constants";
import injectReducer from "../../utils/injectReducer";
import reducer from './reducer';
import ItemFormWrapped from "./ItemFom/ItemFormWrapped";
import {getItemsState, loadingNasaState, nasaDataState} from "./selectors";
import {getItems, getNASAData} from "./actions";
import {addItemFireBase, removeImageFirebase, removeItemFireBase,
    uploadImageFirebase, editItemFireBase, downloadFileFirebase, getDownloadUrl, createModel, updateEditModel} from './utils';
import saga from "./saga";
import injectSaga from "../../utils/injectSaga";
import {isImage, isVideo} from "../../utils/utils";
import EllipsisText from '../../components/ellipsisText/ellipsisText';


class DashBoardApp extends React.Component {
    state = {
        titleItemForm: 'Add Item',
        selectedItem: null,
        visibleFormModel: false,
        mediaUrl: '',
        mediaType: '',
        loading: false
    };
    columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <b>{<EllipsisText text={text} maxLimit={30}/>}</b>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => <p>{<EllipsisText text={text} maxLimit={50}/>}</p>,
        },
        {
            title: 'Date created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
        },
        {
            title: 'Preview',
            key: 'preview',
            render: (text, record) => (
                <span>
                    <Button onClick={() => {this.onPlay(record)}} type="primary" shape="circle" icon="caret-right" />
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

                    <Button onClick={() => {this.onDownload(record)}} type="primary" shape="circle" icon="download" />
                    <Divider type="vertical" />
                    <Button onClick={() => {this.onOpenEditAddForm(record)}} type="primary" shape="circle" icon="edit" />
                    <Divider type="vertical" />
                    <Popconfirm title="Sure to delete?" onConfirm={() => {this.onDeleteRecord(record)}}>
                      <Button disabled={this.state.loading} type="primary" shape="circle" icon="delete" />
                    </Popconfirm>
                </span>
            ),
        }
    ];

    componentWillMount() {
        this.props.getItemsFn();
        this.props.getNasaDataFn(50);
    }

    onCloseModal = () =>{
        if(this.state.visibleFormModel) {
            this.setState({visibleFormModel: false});
        }
    };

    onOpenModal = () =>{
        if(!this.state.visibleFormModel) {
            this.setState({visibleFormModel: true});
        }
    };

    onCancelForm = () => {
        this.handleCancelForm();
    };

    handleCancelForm = () => {
        this.onCloseModal();
        if(this.state.selectedItem) {
            this.setState({selectedItem: null});
        }
    };



    onOpenEditAddForm = (record = null) => {
        this.setState({
            titleItemForm: !record ? 'Add item' : 'Edit Item',
            selectedItem: record
        });
        this.onOpenModal();
    };
    /*
    add edit Item
     */

    submitItem = (values) => {
        const selectedItem = this.state.selectedItem;
        this.setState({loading: true});
        if(selectedItem) { //edit mode
            this.editItem(values, selectedItem);
        } else {
            this.addItem(values);
        }
    };

    editItem = (valueFormObj, selectedItem) => {
        let {preview,} = valueFormObj;
        let editModel = createModel(selectedItem);
        editModel = updateEditModel(valueFormObj, editModel);
        if(preview && editModel.isFromNasaData) {
            let randomName = moment().unix();
            uploadImageFirebase(randomName + preview.name, preview, (snapshot) => {
                editModel.mediaType = isImage(preview.name) ? IMAGE_TYPE : (isVideo(preview.name)? VIDEO_TYPE : AUDIO_TYPE);
                editModel.previewUrl = snapshot.metadata.fullPath;
                editModel.isFromNasaData = false;
                this.editItemOnly(editModel, selectedItem.id);
            });
        }
        if(preview && !editModel.isFromNasaData) {
            removeImageFirebase(selectedItem.previewUrl, () => {
                let randomName = moment().unix();
                uploadImageFirebase(randomName + preview.name, preview, (snapshot) => {
                    editModel.mediaType = isImage(preview.name) ? IMAGE_TYPE : (isVideo(preview.name)? VIDEO_TYPE : AUDIO_TYPE);
                    editModel.previewUrl = snapshot.metadata.fullPath;
                    this.editItemOnly(editModel, selectedItem.id);
                });
            }, (err) => {
                this.setState({loading: false});
                console.log(err);
            });
        }
        if(!preview) {
            this.editItemOnly(editModel, selectedItem.id);
        }
    };
    onDeleteRecord = (record) => {
        this.setState({loading: true});
        if(record.isFromNasaData) {
            this.deleteItemOnly(record);
        } else {
            removeImageFirebase(record.previewUrl, () => {
                this.deleteItemOnly(record);
            }, (err) => {this.setState({loading: false});});
        }
    };
    addItem = (valueFormObj) => {
        let {preview} = valueFormObj;
        let addModel = createModel(valueFormObj);
        if(valueFormObj.isFromNasaData) {
            this.addItemOnly(addModel);
        } else {
            let randomName = moment().unix();
            uploadImageFirebase(randomName + '_' + preview.name, preview, (snapshot) => {
                addModel.mediaType = isImage(preview.name) ? IMAGE_TYPE : (isVideo(preview.name)? VIDEO_TYPE : AUDIO_TYPE);
                addModel.previewUrl = snapshot.metadata.fullPath;
                addModel.dateCreated = moment().format('YYYY-MM-DD');
                this.addItemOnly(addModel);
            });
        }
    };

    addItemOnly = (itemAddingModel) => {
        addItemFireBase(itemAddingModel, () => {
            this.onAddEditDone(`Add item ${itemAddingModel.title} successfully`);
            this.props.resetFromFn();
        });
    };
    deleteItemOnly = (record) => {
        removeItemFireBase(record.id, () => {
            toastr.success('', `Delete item ${record.title} successfully`);
            this.setState({loading: false});
        });
    };
    editItemOnly = (itemEditingModel, id) => {
        editItemFireBase(itemEditingModel, id, () => {
            this.onAddEditDone(`Update item ${itemEditingModel.title} successfully`);
        });
    };

    onAddEditDone = (message) => {
        this.setState({loading: false});
        toastr.success('', message);
        this.handleCancelForm();
    };

    /*
    Other function
     */
    onDownload = (record) => {
        downloadFileFirebase(record.previewUrl, record.isFromNasaData);
    };
    onPlay = (record) => {
        if(record.isFromNasaData) {
            this.setState({mediaUrl: record.previewUrl, mediaType: record.mediaType});
        } else {
            getDownloadUrl(record.previewUrl, (url) => {
                this.setState({mediaUrl: url, mediaType: record.mediaType});
            }, (err) => {
                console.log(err);
            });
        }

    };
    onGetNasaData = (date, dateString) => {
        // this.props.getNasaDataFn(dateString);
    };

    onCancelPreview = (e) => {
        this.setState({mediaUrl: ''});
    };


    render() {
        let items = [];
        if(this.props.items) {
            items = Object.keys(this.props.items).map((key) => {
                let data = this.props.items[key];
                data['id'] = key;
                return data;
            });
        }
        return (
            <Layout>
                <Helmet>
                    <title>Item Management</title>
                    <meta name="description" content="Item Management"/>
                </Helmet>
                <Row>
                    <Col xs={{ span: 22, offset: 1 }}
                        className={'dashboard-page'}>
                        <Row className={'header-table'}>
                            <Col span={8}>
                                <Button className="editable-add-btn" onClick={ ()=> {this.onOpenEditAddForm()}}>Add</Button>
                            </Col>
                            <Col span={8} offset={8} className={'header-custom'}>
                                <CSVLink data={items} >Export CSV file</CSVLink>
                            </Col>
                        </Row>
                        <Table pagination={{ pageSize: 5 }}
                               rowKey="id" columns={this.columns} dataSource={items} />
                        <Modal
                            title={this.state.titleItemForm}
                            visible={this.state.visibleFormModel}
                            onCancel={this.onCancelForm}
                            footer={null}>
                            <ItemFormWrapped onAddEditForm={this.submitItem} selectedItem={this.state.selectedItem}
                                             loading={this.state.loading} onGetNasaData={this.onGetNasaData}
                                             nasaData={this.props.nasaData} loadingNasa={this.props.loadingNasa}
                                            onOffSignal={this.state.visibleFormModel}/>
                        </Modal>
                        <Modal
                            title={'Preview'}
                            visible={!!this.state.mediaUrl}
                            onCancel={this.onCancelPreview}
                            footer={null}>
                            <div className={'clearfix'}>
                                {this.state.mediaType === IMAGE_TYPE ?
                                    (<img width={'100%'} height={'auto'} src={this.state.mediaUrl} />)
                                    : (<ReactPlayer width={'100%'}
                                                    height={this.state.mediaType === AUDIO_TYPE ? '70px': 'auto'}
                                                    controls={true} url={this.state.mediaUrl} playing />) }
                            </div>

                        </Modal>
                    </Col>
                </Row>

            </Layout>
        );
    }
}

DashBoardApp.propTypes = {
    // reducer state
    getItemsFn: propTypes.func,
    getNasaDataFn: propTypes.func,
    items: propTypes.any,
    nasaData: propTypes.any,
    loadingNasa: propTypes.any,
    resetFromFn: propTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        getItemsFn: () => {
            itemsRef.on("value", snapshot => {
                dispatch(getItems(snapshot.val()));
            });
        },
        getNasaDataFn: (count) => {
            dispatch(getNASAData(count));
        },
        resetFromFn: () => {
            dispatch(reset(ITEM_FORM_ID));
        },
    };
}

const mapStateToProps = createStructuredSelector({
    items: getItemsState(),
    nasaData: nasaDataState(),
    loadingNasa: loadingNasaState(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: SELECTOR_ID_PAGE, reducer });
const withSaga = injectSaga({ key: SELECTOR_ID_PAGE, saga });
export default compose(
    withReducer,
    withSaga,
    withConnect,
)(DashBoardApp);
