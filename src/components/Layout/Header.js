import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdInsertChart,
  MdPersonPin,
  MdMessage,
  MdSettingsApplications,
  MdHelp,
  MdClearAll,
  MdExitToApp,
} from 'react-icons/lib/md';

import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';


import withBadge from 'hocs/withBadge';


const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          isOpenNotificationPopover: false,
          isNotificationConfirmed: false,
          isOpenUserCardPopover: false,
          userData:{
              firstName:"",
              lastName:"",
              email:""
          }
      }
  }

  componentWillMount(){
    let keyId=localStorage.getItem("keyId");
    fetch("http://localhost:8080/getUser",{
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization":keyId
        }
    })
        .then(handleErrors)
        .then((response)=>{
          return response.json()
        })
        .then((response)=>{
               this.setState(prevState=>({
                   userData:{
                       firstName:response.responseObject.firstName,
                       lastName:response.responseObject.lastName,
                       email:response.responseObject.email
                   }
               }));

        })
        .catch((err)=>{
            this.props.logout();
      })
  }

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  signout=()=>{
    this.props.logout();
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}>
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.userData.firstName+" "+this.state.userData.lastName}
                  subtitle={this.state.userData.email}
                  text=""
                  className="border-light">
                  <ListGroup flush>
                    <ListGroupItem tag="button" onClick={this.signout} action className="border-light">
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}

export default Header;
