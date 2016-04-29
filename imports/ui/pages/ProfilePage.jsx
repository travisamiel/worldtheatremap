import React from 'react';
import classnames from 'classnames';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import Profile from '../components/Profile.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  render() {
    // const { profile, profileExists, loading } = this.props;
    const { profile, user } = this.props;
    const { editing } = this.state;

    const profilePageClass = classnames({
      'page': true,
      'profiles-show': true,
      editing,
    });

    return (
      <div className={profilePageClass}>
        {!profile ? <NotFoundPage/> :
          editing && user ?
            <ProfileEdit
              profile={profile}
              onEditingChange={this.onEditingChange}
            /> :
            <Profile
              profile={profile}
              user={user}
              // editing={editing}
              onEditingChange={this.onEditingChange}
            />
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: React.PropTypes.object,
  user: React.PropTypes.object,
  // loading: React.PropTypes.bool,
  // profileExists: React.PropTypes.bool,
};
