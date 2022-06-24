import React, { useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Group, Avatar } from '@mantine/core';
import {
    Icon as TablerIcon,
    Users,
    Dashboard as DashboardIcon,
    SwitchHorizontal,
    Logout,
    Apps,
    User
} from 'tabler-icons-react';
import { Link as RouteLink, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
    },
}));


function NavbarLink({ icon: Icon, label, onClick, link }) {
    const { classes, cx } = useStyles();

    let resolved = useResolvedPath(link ? link + "/*" : '-');
    let active = useMatch({ path: resolved.pathname });

    const button = 
        <Tooltip label={label} position="right" withArrow transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon />
            </UnstyledButton>
        </Tooltip>;

    return link ? <RouteLink to={`${link}`}>{button}</RouteLink> : button;
}

const mockdata = [
    { icon: DashboardIcon, label: 'Dashboard', link: '/' },
    { icon: Users, label: 'Usuários', link: '/users' },
    { icon: Apps, label: 'Aplicações', link: '/applications' }
];

export default function NavbarMinimal() {

    const { user, signOut } = useAuth();
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        user &&
        <Navbar width={{ base: 80 }} >
            <Navbar.Section grow mt={30}>
                <Group direction="column" align="center" spacing={0}>
                    {links}
                </Group>
            </Navbar.Section>
            <Navbar.Section mb={30}>
                <Group direction="column" align="center" spacing={0}>
                    <NavbarLink icon={() => <Avatar radius='xl' color='red'><User /></Avatar>} label={user.login} />
                    <NavbarLink icon={Logout} label="Logout" onClick={() => {
                        signOut();
                    }} />
                </Group>
            </Navbar.Section>
        </Navbar>
    );
}
