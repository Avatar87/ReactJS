import React, { PureComponent, Fragment } from 'react';

import UserPage from '../components/UserPage';
import Loading from '../components/Loading';

export default class UserContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: false
    }
  }

  componentDidMount() {
    const { match } = this.props;

    this.setState({ loading: true });
    
    fetch(`http://localhost:3000/users/${match.params.userId}`)
      .then((response) => response.json())
      .then((user) => {
        this.setState({
          user,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          user: {},
          loading: false
        });
     });
     
  }

  render() {
    const { user, loading } = this.state;

    return (
      <Fragment>
        <div className = "wrap">
          <div className = "content1">
        { loading ? <Loading /> : <UserPage {...user} /> }
          </div>
        </div>
      </Fragment>
    );
  }
}
