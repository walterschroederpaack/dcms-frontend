import React from 'react'
import moment from 'moment';

class DistributionCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InitialDC: this.props.distributioncenter,
      distributioncenter: this.props.distributioncenter
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const field = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let distributioncenter = {...this.state.distributioncenter}
    distributioncenter[field] = value;
    this.setState({distributioncenter})
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`https://dcms-backend-dgopr4idaa-ew.a.run.app/dcs/${this.state.distributioncenter.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(this.state.distributioncenter),
  })
    .then(function(response) {
      if (response.status === 204) {
        this.setState({
          InitialDC: this.state.distributioncenter
        })
      } else {
        this.setState({
          message: response.error.message
        })
      }
    });
  }

  handleCancel() {
    this.setState({
      distributioncenter: this.state.InitialDC
    })
  }

  render() {
    const dc = this.state.distributioncenter
    return (
      <tr key={dc.id}>
        <td>{dc.id}</td>
        <td><input type="text" name="name" value={dc.name} onChange={(e) => {this.handleChange(e)}}/></td>
        <td><input type="text" name="short_name" value={dc.short_name} onChange={(e) => {this.handleChange(e)}}/></td>
        <td>{dc.address.line1}, {dc.address.post_code} {dc.address.city}, {dc.address.country}</td>
        <td>
          <select name="type" value={dc.type} onChange={(e) => {this.handleChange(e)}}>
            <option value="Paack">Paack</option>
            <option value="Partner">Partner</option>
          </select>
        </td>
        <td>
          <select name="operations"  value={dc.operations} onChange={(e) => {this.handleChange(e)}}>
            <option value="CROSS_DOCK">Cross Dock</option>
            <option value="LAST_MILE">Last Mile</option>
          </select>
        </td>
        <td><input type="checkbox" name="is_active" checked={dc.is_active} onChange={(e) => {this.handleChange(e)}}/></td>
        <td>{moment(dc.created_at).format('DD/MM/YYYY H:mm:ss')}</td>
        <td>{moment(dc.updated_at).format('DD/MM/YYYY H:mm:ss')}</td>
        <td>
          {this.state.InitialDC !== dc?
          <div>
            <button onClick={this.handleSubmit}>
              Save
            </button>
            <button onClick={this.handleCancel}>
              Cancel
            </button>
            {this.state.message}
          </div>
          :
          null}
        </td>
      </tr>
    );
  }
}

export default DistributionCenter