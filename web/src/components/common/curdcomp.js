import React, { Component } from 'react';
import { Table, message, Row, Col, Input, Popconfirm, Button, Modal, Form, Select } from 'antd';
import EditableCell from './editablecell';
import { getRes, postRes, patchRes, deleteRes } from '../../utils/request';
import token from '../../utils/tokenHelper';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class CurdComp extends Component {
  constructor (props) {
    super(props);
    const columns = [...this.props.columns];
    columns.map((item) => {
      if (item.editable) {
        item['render'] = (text, record) => (
          <EditableCell
            value={text}
            onChange={(newVal) => {this.onCellChange(record._id, item.dataIndex, newVal)}}
          />
        );
      }
      return item;
    });
    if (this.props.configuration.actions && this.props.configuration.actions.length > 0) {
      columns.push({
        title: '操作',
        width: 200,
        key: 'action',
        render: (text, record) => (
          <span>
            {(this.props.configuration.actions.indexOf('delete') !== -1) &&
              <Popconfirm title="确认删除该条目?" onConfirm={() => {this.deleteItem(record._id)}} okText="确认" cancelText="取消">
                <a>删除</a>
              </Popconfirm>}
          </span>
        ),
      });
    }
    this.state = {
      columns: columns || [],
      fetching: false,
      data: [],
      pagination: {},
      searchStr : '',
      visible: false,
      confirmLoading: false
    };
    this.onTableUpdate = this.onTableUpdate.bind(this);
    this.requestDataByParams = this.requestDataByParams.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.addExec = this.addExec.bind(this);
  }

  deleteItem (id) {
    deleteRes({
      'url': this.props.configuration.url + '/' + id, 
      'headers': {
        'Authorization': token.getToken()
      },
      'handler': (resData) => {
        this.setState({
          data: this.state.data.filter((item) => item._id !== id),
          fetching: false
        });
      },
      'errorHandler': (err) => {
        this.setState({
          fetching: false
        });
        message.error('数据删除失败!');
      }
    });    
  }

  onCellChange (id, key, value) {
    patchRes({
      'url': this.props.configuration.url + '/' + id, 
      'headers': {
        'Authorization': token.getToken()
      },
      data: {
        [key]: value,
        fetching: true
      },
      'handler': (resData) => {
        this.setState({
          fetching: false
        });
        message.success('数据更新成功！');
      },
      'errorHandler': (err) => {
        this.setState({
          fetching: false
        });
        message.error('数据更新失败!');
      }
    });
  }

  onAdd = () => {
    this.setState({visible: true});
  }

  addExec = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(!err){
        this.setState({
          confirmLoading: true
        });
        postRes({
          'url': this.props.configuration.url, 
          'headers': {
            'Authorization': token.getToken()
          },
          data: {
            ...value,
            source: 'admin-add'
          },
          'handler': (resData) => {
            this.setState({
              data: [resData, ...this.state.data],
              confirmLoading: false,
              visible: false
            });
            message.success('数据添加成功！');
          },
          'errorHandler': (err) => {
            this.setState({
              confirmLoading: false,
              visible: false
            });
            message.error('数据添加失败!');
          }
        });
      }
    });
  }

  componentWillMount () {
    this.requestDataByParams({});
  }

  onSearch (value) {
    this.requestDataByParams({limit: 500, matchValue: value.trim()})
  }

  requestDataByParams ({limit =10, current: skip = 1 , field = 'createdAt', order = 'descend', filters, matchValue}) {
    this.setState({
      fetching: true
    });
    const filtersMap = {};
    for (let key in filters) {
      filtersMap[key+'[$in]'] = filters[key];
    }
    if (matchValue) {
      filtersMap[this.props.configuration.searchKey+'[$search]'] = matchValue;
    }
    getRes({
      'url': this.props.configuration.url, 
      'headers': {
        'Authorization': token.getToken()
      },
      'handler': (resData) => {
        this.setState({
          data: resData.data,
          fetching: false,
          pagination: Object.assign({}, this.state.pagination, {total: resData.total})
        });
      },
      'errorHandler': (err) => {
        this.setState({
          fetching: false
        });
        message.error('数据请求失败！');
      },
      'params': {
        '$limit': limit ,
        '$skip': (skip - 1) * limit ,
        ['$sort['+field+']']: (order === 'descend' ? -1 : 1),
        ...filtersMap
      }
    });    
  }

  onTableUpdate (pagination, filters, sorter) {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.requestDataByParams({
      ...pager,
      filters,
      ...sorter
    });
  }

  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return <div>
    <Row gutter={16} type="flex" justify="end" style={{'margin': '0 0 10px 0'}}>
      <Col>
        <Search
          placeholder= {this.props.configuration.tooltip}
          onSearch= {this.onSearch}
          enterButton
          onChange= {this.onChange}
          defaultValue= {this.state.searchStr}
          style= {{ width: 200}}
          size= "small"
        />
        {this.props.configuration.actions.indexOf('add') !== -1 &&  <Button type="primary" icon="plus-square-o" size="small" style={{marginLeft: "20px"}} onClick={this.onAdd} ghost>Add</Button>}
      </Col>
    </Row>
    <Table size="small" filterMultiple={true} rowKey={record => record._id} onChange={this.onTableUpdate} bordered={true} loading={this.state.fetching} columns={this.state.columns} dataSource={this.state.data} pagination={this.state.pagination} scroll={{ x: 400 }} />
    <Modal title="添加"
      visible={this.state.visible}
      onOk={this.addExec}
      confirmLoading={this.state.confirmLoading}
      onCancel={() => {this.setState({visible: false});}}
    >
      <Form>
        {this.props.configuration.addConfig.map((item) => {
          switch(item.type){
            case 'Input': 
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: item.defaultValue,
                  rules: [
                    { required: item.required, message: '必填项!' },
                    { type: item.validType, message: '请输入正确的类型!'}
                  ],
                })(
                  <Input />
                )}
              </FormItem>;
            case 'Select':
              return <FormItem {...formItemLayout} label={item.label} key={item.key}>
                {getFieldDecorator(item.key, {
                  initialValue: item.defaultValue,
                  rules: [
                    { required: item.required, message: '必填项!' },
                    { type: item.validType, message: '请输入正确的类型!'}
                  ],
                })(
                  <Select>
                    {item.options.map((option) => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                  </Select>
                )}
              </FormItem>;            
            default: 
              return '';
          }
        })}
      </Form>
    </Modal>    
    </div>;
  }
}

export default Form.create()(CurdComp);