import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

export default function MenuBar() {
    const { user, logout} = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home': pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);


    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menubar = user ? (
        <Menu pointing secondary size="massive" color="teal" inverted>
            <Menu.Item name={user.username} active as={Link} to='/' />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="massive" color="teal" inverted>
            <Menu.Item name="home" active={activeItem === 'home'} onClick={handleItemClick} as={Link} to='/' />
            <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={handleItemClick}
                as={Link} 
                to='/about'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link} 
                    to='/register'
                />
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link} 
                    to='/login'
                />
            </Menu.Menu>
        </Menu>
    )

    return menubar;
}