import React from 'react';
import PropTypes from 'prop-types';
import MarkdownView from 'react-showdown';
import markdownit from 'markdown-it';

import {
    Paper,
    Accordion,
    AccordionSummary,
    AccordionActions,
    List,
    ListItem,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Snackbar, Box,
} from '@mui/material';

import {
    MdEdit as IconEdit,
    MdClose as IconClose,
    MdMenu as IconMenu,
    MdExpandMore as IconExpandMore,
} from 'react-icons/md';
import { FaGithub as IconGithub } from 'react-icons/fa';
import IconGlobe from './assets/globe.svg';
import IconLink from './assets/link.svg';

import Router from './Router';
import Loader from './Components/Loader';
import I18n from './i18n';
import Utils from './Utils';
import Page404 from './Pages/404';

const md = markdownit({ html: true, breaks: true });

const styles = {
    root: {
        width: 'calc(100% - 40px)',
        maxWidth: 1000,
        m: '20px',
        '& .md-link': {
            display: 'inline-block',
        },
        '& h2': {
            width: '100%',
            textAlign: 'left',
            pb: '10px',
            borderBottom: '1px solid lightgray',
        },
        '& hr': {
            borderWidth: '0 0 1px 0',
        },
        '& a': {
            color: 'inherit',
        },
        '& pre': {
            background: '#e3e3e3',
        },
        '& code': {
            margin: '0 0.15em',
            padding: '0.125em 0.4em',
            borderRadius: '2px',
            background: '#e3e3e3',
            color: '#000000',
            whiteSpace: 'pre',
        },
        '& img': {
            maxWidth: '100%',
        },
    },
    logoImage: {
        width: 64,
        verticalAlign: 'middle',
    },
    infoEdit: {
        float: 'right',
        textDecoration: 'none',
        color: 'gray',
    },
    infoEditLocal: {
        float: 'right',
        textDecoration: 'none',
        marginRight: 15,
        cursor: 'pointer',
        display: 'inline-block',
    },
    adapterCard: {
        marginBottom: 0,
        marginTop: 0,
    },
    badgesDetails: {
        display: 'block',
        '& img': {
            marginRight: '5px',
        },
    },
    titleText: {
        display: 'inline-block',
        marginLeft: 10,
    },
    adapterCardAttr:{
        fontWeight: 'bold',
        width: 150,
        display: 'inline-block',
    },
    adapterCardListItem: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    description: {
        fontStyle: 'italic',
    },
    contentDiv: {
        position: 'fixed',
        width: '20%',
        minWidth: 200,
        overflowX: 'hidden',
        opacity: 0.8,
        top: 60,
        right: 20,
        background: '#EEEEEE',
        maxHeight: 'calc(100% - 70px)',
    },
    contentDivClosed: {
        position: 'fixed',
        opacity: 0.8,
        top: 60,
        right: 20,
        width: 25,
        height: 25,
        cursor: 'pointer',
    },
    contentClose: {
        position: 'fixed',
        top: 60 + 5,
        right: 20 + 5,
        p: 0,
        cursor: 'pointer',

        '&:hover': {
            color: '#111111',
        },
    },
    contentLinks: {
        cursor: 'pointer',
        '&:hover': {
            color: '#111111',
        },
    },
    headerTranslated: {
        borderColor: '#009c4f',
        borderWidth: '0 0 0 3px',
        p: '10px',
        mt: 5,
        marginBottom: '5px',
        borderStyle: 'solid',
        background: '#bdded5',
        cursor: 'pointer',
        '&:before': {
            content: `url(${IconGlobe})`,
            mr: '10px',
            color: '#000000',
            height: 20,
            width: 20,
        },
    },
    license: {
        paddingLeft: 10,
        fontWeight: 'bold',
        marginTop: 0,
        paddingTop: 1,
        marginLeft: 8,
        marginRight: 8,
    },
    mdLink: {
        cursor: 'pointer',
        textDecoration: 'underline',
        '&:after': {
            // content: '"🔗"',
            content: `url(${IconLink})`,
            width: 16,
            height: 16,
            opacity: 0.7,
            fontSize: 14,
            // marginLeft: 5
        },
    },
    mdHeaderLink: {
        textDecoration: 'none',
        '&:after': {
            content: '"🔗"',
            width: 16,
            height: 16,
            opacity: 0,
            fontSize: 14,
            // marginLeft: 5
        },
        '&:hover:after': {
            opacity: 0.7,
        },
    },
    info: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    email: {
        fontStyle: 'italic',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    name: {
        fontStyle: 'italic',
    },

    table: {
        width: 'auto',
    },
    tableHead: {
        background: '#555555',
    },
    tableRowHead: {
        height: 24,
    },
    tableCellHead: {
        color: '#FFFFFF',
        padding: '3px 10px',
        border: '1px solid rgba(224, 224, 224, 1)',
        margin: 0,
        '&>p': {
            margin: 0,
        },
    },
    tableBody: {

    },
    tableRow: {
        height: 24,
    },
    tableCell: {
        padding: '3px 10px',
        margin: 0,
        border: '1px solid rgba(224, 224, 224, 1)',
        '&>p': {
            margin: 0,
        },
    },

    summary: {
        transition: 'background 0.5s, color: 0.5s',
    },
    summaryExpanded: {
        fontWeight: 'bold',
        // color: '#FFFFFF',
        background: '#DDDDDD',
    },

    warn: {
        borderColor: '#0b87da',
        borderWidth: '0 0 0 3px',
        p: '1px 10px',
        mt: '5px',
        mb: '5px',
        borderStyle: 'solid',
        background: '#eff6fb',
        '&:before': {
            content: '"⚠"',
            // borderRadius: '50%',
            // background: '#008aff',
        },
    },
    alarm: {
        borderColor: '#da0b50',
        borderWidth: '0 0 0 3px',
        p: '1px 10px',
        mt: '5px',
        mb: '5px',
        borderStyle: 'solid',
        background: '#fbeff3',
        '&:before': {
            content: '"⚠"',
            // borderRadius: '50%',
            // background: '#008aff',
        },
    },
    notice: {
        borderColor: '#9c989b',
        borderWidth: '0 0 0 3px',
        p: '1px 10px',
        mt: '5px',
        mb: '5px',
        borderStyle: 'solid',
        background: '#dedede',
        '&:before': {
            content: '"✋"',
            // borderRadius: '50%',
            // background: '#dedede',
        },
    },
    todo: {
        borderColor: '#00769c',
        borderWidth: '0 0 0 3px',
        pl: '10px',
        pr: '10px',
        pt: 0,
        pb: 0,
        mt: '5px',
        mb: '5px',
        borderStyle: 'solid',
        background: '#c4d2de',
        /*
        &:before': {
            content: '"✋"',
            // borderRadius: '50%',
            // background: '#dedede',
        }
        */
    },
    paragraph: {

    },

    changeLog: {
        display: 'block',
    },
    changeLogDiv: theme => ({
        display: 'block',
        mb: '16px',
        ml: '8px',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#CCC',
        },
    }),
    changeLogVersion: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    changeLogDate: {
        fontSize: 14,
        fontStyle: 'italic',
        marginLeft: 8,
        opacity: 0.7,
    },
    changeLogLine: {
        display: 'block',
        fontSize: 12,
        ml: '8px',
        '&:before': {
            content: '"- "',
        },
    },
    changeLogAuthor: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginRight: 8,
    },
    changeLogLineText: {

    },
    changeLogAccordion: {
        justifyContent: 'flex-start',
    },
};

const CONVERTER_OPTIONS = {
    emoji: true,
    underline: true,
    strikethrough: true,
    simplifiedAutoLink: true,
    parseImgDimensions: true,
    splitAdjacentBlockquotes: true,
};

let gTitle;

const ADAPTER_CARD = ['version', 'authors', 'keywords', 'mode', 'materialize', 'compact'];

const EXPAND_LANGUAGE = {
    en: 'english',
    de: 'german',
    ru: 'russian',
    'zh-cn': 'chinese (simplified)',
};

class Markdown extends Router {
    constructor(props) {
        super(props);
        // load page
        this.state = {
            parts: [],
            title: '',
            loadTimeout: false,
            header: {},
            content: {},
            license: '',
            changeLog: '',
            tooltip: '',
            text: this.props.text || '',
            notFound: false,
            affiliate: null,
            hideContent: window.localStorage ? window.localStorage.getItem('Docs.hideContent') === 'true' : false,
        };

        if (!gTitle) {
            gTitle = window.title;
        }

        this.mounted = false;

        if (!this.state.text) {
            this.load();

            // Give 300ms to load the page. After that show the loading indicator.
            setTimeout(() => !this.state.parts.length && this.setState({ loadTimeout: true }), 300);
        } else {
            this.parseText();
        }

        this.contentRef = React.createRef();

        this.customLink = ({ text, link }) =>
            <Box
                component="a"
                className="md-link"
                sx={styles.mdLink}
                onClick={() => {
                    if (link) {
                        if (link.startsWith('#')) {
                            this.onNavigate(Utils.text2link(link.substring(1)));
                        } else {
                            let href = link;
                            if (!href.match(/^https?:\/\//)) {
                                const parts = (this.props.path || '').split('/');
                                // const fileName = parts.pop();
                                const prefix = `${parts.join('/')}/`;

                                href = prefix + link;
                            }

                            this.onNavigate(null, href);
                        }
                    }
                }}
                title={link}
                href="."
            >
                {text}
            </Box>;

        /*
        if (reactObj && (reactObj.type === 'h1' || reactObj.type === 'h2' || reactObj.type === 'h3' || reactObj.type === 'h3')) {
            reactObj.props.children[0] = (<span>{reactObj.props.children[0]}<a
                href={prefix + '?' + reactObj.props.id}
                style={styles.mdHeaderLink + ' md-h-link'}>
            </a></span>);
        }
         */
        this.customH = ({
            text, id, level, prefix,
        }) => {
            const _level = parseInt(level, 10);

            if (_level === 1) {
                return <h1 id={id}>
                    <span>{text}</span>
                    <Box component="a" href={`${prefix}?${id}`} sx={styles.mdHeaderLink} className="md-h-link" />
                </h1>;
            }
            if (_level === 2) {
                return <h2 id={id}>
                    <span>{text}</span>
                    <Box component="a" href={`${prefix}?${id}`} sx={styles.mdHeaderLink} className="md-h-link" />
                </h2>;
            }
            if (_level === 3) {
                return <h3 id={id}>
                    <span>{text}</span>
                    <Box component="a" href={`${prefix}?${id}`} sx={styles.mdHeaderLink} className="md-h-link" />
                </h3>;
            }
            if (_level === 4) {
                return <h4 id={id}>
                    <span>{text}</span>
                    <Box component="a" href={`${prefix}?${id}`} sx={styles.mdHeaderLink} className="md-h-link" />
                </h4>;
            }
            if (_level === 5) {
                return <h5 id={id}>
                    <span>{text}</span>
                    <Box component="a" href={`${prefix}?${id}`} sx={styles.mdHeaderLink} className="md-h-link" />
                </h5>;
            }

            return <h6 id={id}>
                <span>{text}</span>
                <Box component="a" href={`${prefix}?${id}`} sx={styles.mdHeaderLink} className="md-h-link" />
            </h6>;
        };
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.path !== nextProps.path) {
            this.mounted && this.setState({ notFound: false, parts: [] });
            this.load(nextProps.path);
        } else if (this.props.text !== nextProps.text) {
            this.setState({ text: nextProps.text });
            if (!nextProps.text) {
                if (this.props.path !== nextProps.path) {
                    this.mounted && this.setState({ notFound: false, parts: [] });
                    this.load(nextProps.path);
                }
            } else {
                this.mounted && this.setState({ text: nextProps.text }, () =>
                    this.parseText());
            }
        } else if (this.props.language !== nextProps.language) {
            this.mounted && this.setState({ notFound: false, parts: [] });
            this.load(null, nextProps.language);
        }
    }

    static onHashChange(location) {
        location = location || Router.getLocation();
        if (location.chapter) {
            const el = window.document.getElementById(location.chapter);
            el && el.scrollIntoView(true);
        }
    }

    onNavigate(id, link) {
        if (link && link.match(/^https?:\/\//)) {
            Utils.openLink(link);
        } else if (id) {
            const el = window.document.getElementById(id) || window.document.getElementById(id.replace('nbsp', ''));
            if (el) {
                el.scrollIntoView(true);
                if (this.props.mobile) {
                    this.setState({ hideContent: true });
                }
            }
        } else if (link) {
            // if relative path
            if (!link.startsWith('#')) {
                // ../../download
                const ppp = link.replace(`${this.props.path}/`, '').split('#');
                const _link = ppp[1];
                let _path = ppp[0].replace(/\.MD$/, '.md');
                if (!_path.endsWith('.md')) {
                    _path += '.md';
                }
                const location = Router.getLocation();

                if (_path.startsWith('.')) {
                    const parts = _path.split('/');
                    const locParts = location.page.split('/');
                    locParts.pop();
                    parts.forEach(part => {
                        if (part === '.') {
                            return;
                        }
                        if (part === '..') {
                            locParts.pop();
                            return;
                        }
                        locParts.push(part);
                    });
                    _path = locParts.join('/');
                }

                this.props.onNavigate(null, this.props.rootPath || location.tab, _path, _link);
            } else {
                this.props.onNavigate(null, null, link);
            }
        }
    }

    parseText(text) {
        text = text || this.state.text || '';
        if (this.props.editEnabled) {
            this.editText = text;
        }
        if (!text || text.startsWith('<!DOCTYPE html>')) {
            // page not found
            this.setState({ notFound: true });
            return;
        }

        const {
            header,
            parts,
            content,
            license,
            changeLog,
            title,
        } = this.format(text);
        let _title = header.title || title || Utils.getTitle(text);
        if (_title) {
            window.document.title = _title;
        } else if (title) {
            _title = title;
            window.document.title = title;
        }
        let affiliate = null;
        if (header.affiliate) {
            try {
                affiliate = JSON.parse(header.affiliate);
            } catch (e) {
                console.error(`Cannot parse affiliate: ${header.affiliate}`);
            }
        }

        this.mounted && this.setState({
            affiliate,
            notFound: false,
            parts,
            header,
            loadTimeout: false,
            content,
            license,
            changeLog,
            title: _title,
        });

        this.onHashChange && setTimeout(() => Markdown.onHashChange(), 200);
    }

    load(path, language) {
        path = path || this.props.path;
        language = language || this.props.language;
        if (path && language) {
            fetch(`${language}${path[0] === '/' ? path : `/${path}`}`)
                .then(res => res.text())
                .then(text => this.parseText(text));
        }
    }

    format(text) {
        text = (text || '').trim();
        const result = Utils.extractHeader(text);
        const header = result.header;
        let body = result.body;

        // remove comments like <!-- -->
        body = body.replace(/\r\n|\n/g, '§$§$');
        body = body.replace(/<!--[^>]*-->/, '\n');
        body = body.replace(/§\$§\$/g, '\n');
        body = body.replace(/\[\*\*\*\s(.+)\s\*\*\*]/g, '[***$1***]');
        body = body.replace(/\[\*\*\s(.+)\s\*\*]/g, '[**$1**]');
        body = body.replace(/\[\*\s(.+)\s\*]/g, '[*$1*]');

        body = Utils.removeDocsify(body);
        const {
            parts,
            content,
            license,
            changeLog,
            title,
        } = Utils.decorateText(body, header, `${this.props.path && (this.props.path[0] === '/' ? this.props.path : `/${this.props.path}`)}`);

        return {
            header, parts, content, license, changeLog, title,
        };
    }

    formatAuthors(text) {
        const parts = text.split(',').map(t => t.trim()).filter(t => t);

        const authors = [];
        for (let i = 0; i < parts.length; i++) {
            const m = parts[i].trim().match(/<([-.\w\d_@]+)>$/);
            if (m) {
                const email = m[1];
                authors.push(<span
                    key={parts[i]}
                    style={styles.email}
                    title={I18n.t('Click to copy %s', email)}
                    onClick={e => {
                        Utils.onCopy(e, email);
                        this.setState({ tooltip: I18n.t('Copied') });
                    }}
                >
                    {parts[i].replace(m[0], '').trim() + (parts.length - 1 === i ? '' : ', ')}
                </span>);
            } else {
                authors.push(<span key={parts[i]} style={styles.name}>{parts[i] + (parts.length - 1 === i ? '' : ', ')}</span>);
            }
        }

        return authors;
    }

    renderHeader() {
        const data = [];

        if (this.state.header.translatedFrom) {
            let translatedFrom = EXPAND_LANGUAGE[this.state.header.translatedFrom] || this.state.header.translatedFrom;
            // Translate language from english to actual language
            translatedFrom = I18n.t(translatedFrom);

            data.push(<Box
                key="translatedFrom"
                sx={styles.headerTranslated}
                onClick={() => this.props.onNavigate && this.props.onNavigate(this.state.header.translatedFrom)}
                title={I18n.t('Go to original')}
            >
                {I18n.t('Translated from %s', translatedFrom)}
            </Box>);
        }

        if (this.state.header.adapter) {
            data.push(<h1 key="h1">
                {[
                    this.state.header.logo ? <img key="logo" src={this.state.header.logo} alt="logo" style={styles.logoImage} /> : null,
                    <div key="title" style={styles.titleText}>{this.state.header.title}</div>,
                ]}
            </h1>);

            if (this.state.header.readme) {
                const link = this.state.header.readme
                    .replace(/blob\/master\/README.md$/, '')
                    .replace(/blob\/main\/README.md$/, '');

                data.push(<IconButton key="github" title={I18n.t('Open repository')} onClick={() => Utils.openLink(link)}>
                    <IconGithub />
                </IconButton>);
            }
        }

        if (this.state.header.description) {
            data.push(<span key="description" style={styles.description}>{this.state.header.description}</span>);
        }

        if (Object.keys(this.state.header).find(attr => ADAPTER_CARD.includes(attr))) {
            data.push(<Accordion key="header" style={styles.adapterCard}>
                <AccordionSummary
                    style={styles.summary}
                    sx={{ '&.Mui-expanded': styles.summaryExpanded }}
                    expandIcon={<IconExpandMore />}
                >
                    {I18n.t('Information')}
                </AccordionSummary>
                <AccordionActions style={{ justifyContent: 'start' }}>
                    <List>
                        {ADAPTER_CARD
                            .filter(attr => this.state.header.hasOwnProperty(attr))
                            .map(attr => <ListItem key={attr} style={styles.adapterCardListItem}>
                                <div style={styles.adapterCardAttr}>
                                    {I18n.t(attr)}
                                    <span>: </span>
                                </div>
                                <span>{attr === 'authors' ? this.formatAuthors(this.state.header[attr]) : this.state.header[attr].toString()}</span>
                            </ListItem>)}
                    </List>
                </AccordionActions>
            </Accordion>);
        }

        if (Object.keys(this.state.header).find(attr => attr.startsWith('BADGE-'))) {
            data.push(<Accordion key="header_badges" style={styles.adapterCard}>
                <AccordionSummary style={styles.summary} sx={{ '&.Mui-expanded': styles.summaryExpanded }} expandIcon={<IconExpandMore />}>{I18n.t('Badges')}</AccordionSummary>
                <AccordionActions sx={styles.badgesDetails}>
                    {Object.keys(this.state.header).filter(attr => attr.startsWith('BADGE-'))
                        .map((attr, i) => [
                            this.state.header[attr].includes('nodei.co') ? <br key={`br${i}`} /> : null,
                            <img key={`img${i}`} src={this.state.header[attr]} alt={attr.substring(6)} />,
                        ])}
                </AccordionActions>
            </Accordion>);
        }

        return data;
    }

    renderInfo() {
        return <div style={styles.info}>
            {this.state.header.lastChanged ? [
                <span key="lastChangedTitle" style={{ ...styles.infoTitle, marginRight: 8 }}>{I18n.t('Last changed:')}</span>,
                <span key="lastChangedValue" style={styles.infoValue}>{this.state.header.lastChanged}</span>,
            ] : null}
            {this.state.header.editLink ?
                <a
                    style={styles.infoEdit}
                    href={this.state.header.editLink}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <IconGithub />
                    {I18n.t('Edit on github')}
                </a> : null}
            {this.props.editEnabled && this.editText ?
                <div
                    style={styles.infoEditLocal}
                    onClick={() => this.props.onEditMode && this.props.onEditMode(true)}
                >
                    <IconEdit />
                    {I18n.t('Edit local')}
                </div> : null}
        </div>;
    }

    _renderSubContent(menu) {
        return <ul>
            {menu.children.map(item => {
                const ch   = this.state.content[item].children;
                const link = this.state.content[item].external && this.state.content[item].link;
                return <li>
                    <Box component="span" onClick={() => this.onNavigate(item, link)} sx={styles.contentLinks}>{this.state.content[item].title}</Box>
                    {ch ? this._renderSubContent(this.state.content[item]) : null}
                </li>;
            }).filter(e => e)}
        </ul>;
    }

    renderAffiliates() {
        if (!this.state.affiliate || !this.props.affiliates) {
            return null;
        }

        const Affiliates = this.props.affiliates;

        return <Affiliates
            key="affiliates"
            language={this.props.language}
            mobile={this.props.mobile}
            theme={this.props.theme}
            data={this.state.affiliate}
        />;
    }

    onToggleContentButton() {
        this.setState({ hideContent: !this.state.hideContent });
        window.localStorage && window.localStorage.setItem('Docs.hideContent', this.state.hideContent ? 'false' : 'true');
    }

    renderContentCloseButton() {
        if (this.state.hideContent) {
            return <IconButton sx={styles.contentClose} size="small">
                <IconMenu  />
            </IconButton>;
        }
        return <IconButton
            sx={styles.contentClose}
            size="small"
            onClick={() => this.onToggleContentButton()}
        >
            <IconClose />
        </IconButton>;
    }

    renderContent() {
        const links = Object.keys(this.state.content);
        if (!links.length) {
            return null;
        }
        if (this.state.hideContent) {
            return <Paper style={styles.contentDivClosed} onClick={() => this.onToggleContentButton()}>
                {this.renderContentCloseButton()}
            </Paper>;
        }
        return <Paper style={styles.contentDiv}>
            {this.renderContentCloseButton()}
            <ul>
                {links.map(item => {
                    const link  = this.state.content[item].external && this.state.content[item].link;
                    const level = this.state.content[item].level;
                    const title = this.state.content[item].title
                        .replace('&gt;', '>')
                        .replace('&lt;', '<')
                        .replace('&amp;', '&');

                    return <li key={title} style={{ fontSize: 16 - level * 2, paddingLeft: level * 8, fontWeight: !level ? 'bold' : 'normal' }}>
                        <Box component="span" onClick={() => this.onNavigate(item, link)} sx={styles.contentLinks}>{title}</Box>
                        {this.state.content[item].children ? this._renderSubContent(this.state.content[item]) : null}
                    </li>;
                })
                    .filter(e => e)}
            </ul>
        </Paper>;
    }

    renderLicense() {
        if (!this.state.license) {
            return null;
        }
        const CustomLink = this.customLink;
        const CustomH = this.customH;
        return <Accordion>
            <AccordionSummary
                style={styles.summary}
                sx={{ '&.Mui-expanded': styles.summaryExpanded }}
                expandIcon={<IconExpandMore />}
            >
                {I18n.t('License')}
                <span style={styles.license}>
                    {this.state.header.license}
                </span>
            </AccordionSummary>
            <AccordionActions>
                <MarkdownView markdown={this.state.license} options={CONVERTER_OPTIONS} components={{ CustomLink, CustomH }} />
            </AccordionActions>
        </Accordion>;
    }

    renderChangeLog() {
        if (!this.state.changeLog) {
            return null;
        }
        const CustomLink = this.customLink;
        const CustomH = this.customH;
        return <Accordion>
            <AccordionSummary
                style={styles.summary}
                sx={{ '&.Mui-expanded': styles.summaryExpanded }}
                expandIcon={<IconExpandMore />}
            >
                {I18n.t('Changelog')}
            </AccordionSummary>
            <AccordionActions style={styles.changeLogAccordion}>
                <MarkdownView markdown={this.state.changeLog} options={CONVERTER_OPTIONS} components={{ CustomLink, CustomH }} />
            </AccordionActions>
        </Accordion>;
    }

    renderSnackbar() {
        return <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!this.state.tooltip}
            autoHideDuration={6000}
            onClose={() => this.setState({ tooltip: '' })}
            message={<span id="message-id">{this.state.tooltip}</span>}
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    style={styles.close}
                    onClick={() => this.setState({ tooltip: '' })}
                >
                    <IconClose />
                </IconButton>,
            ]}
        />;
    }

    static replaceHref(line) {
        if (!line) {
            return '';
        }
        const m = line.match(/\[.*]\(#[^)]+\)/g);
        if (m) {
            m.forEach(link => {
                const pos = link.lastIndexOf('](');
                const text = link.substring(0, pos).replace(/^\[/, '');
                const href = link.substring(pos + 2).replace(/\)$/, '');
                line = line.replace(link, `<CustomLink text="${text}" link="${href}" />`);
            });
        }
        return line;

        /*
        const parts = (this.props.path || '').split('/');
        // const fileName = parts.pop();
        const prefix = parts.join('/') + '/';

        if (reactObj && reactObj.props && reactObj.props.children) {
            reactObj.props.children.forEach((item, i) => {
                if (item && item.type === 'a') {
                    let link = item.props.href;
                    if (link) {
                        if (link.startsWith('#')) {
                            link = Utils.text2link(link.substring(1));
                            reactObj.props.children[i] = (<div
                                key={'link' + i}
                                style={styles.mdLink + ' md-link'}
                                title={link}
                                onClick={() => this.onNavigate(link)}>
                                {item.props.children ? item.props.children[0] : ''}
                            </div>);
                        } else {
                            const oldLink = link;
                            if (!link.match(/^https?:\/\//)) {
                                link = prefix + link;
                            }

                            reactObj.props.children[i] = (<div
                                key={'link' + i}
                                style={styles.mdLink + ' md-link'}
                                title={oldLink}
                                onClick={() => this.onNavigate(null, link)}>
                                {item.props.children ? item.props.children[0] : ''}
                            </div>);
                        }
                    }
                }

                if (typeof item === 'object') {
                    this.replaceHref(item);
                }
            });
        }
        */
    }

    static makeHeadersAsLink(line, prefix) {
        if (!line) {
            return '';
        }
        const mm = line.match(/^#+\s.+/g);
        if (mm) {
            mm.forEach(header => {
                const level = header.match(/^(#+)\s/)[1].length;
                const text = header.substring(level + 1);
                line = line.replace(header, `<CustomH text="${text}" id="${Utils.text2link(text)}" level="${level}" prefix="${prefix}"/>`);
            });
        }
        return line;
        /*
        if (reactObj && (reactObj.type === 'h1' || reactObj.type === 'h2' || reactObj.type === 'h3' || reactObj.type === 'h3')) {
            reactObj.props.children[0] = (<span>{reactObj.props.children[0]}<a
                href={prefix + '?' + reactObj.props.id}
                style={styles.mdHeaderLink + ' md-h-link'}>
            </a></span>);
        }
        */
    }

    renderTable(lines, key) {
        const header = lines[0].replace(/^\||\|$/g, '').split('|').map(h => h.trim());
        const CustomLink = this.customLink;
        const CustomH = this.customH;

        const rows = [];
        for (let i = 2; i < lines.length; i++) {
            const parts = lines[i].replace(/^\||\|$/g, '').split('|').map(a => a.trim());

            const cells = [];
            for (let j = 0; j < header.length; j++) {
                parts[j] = Markdown.replaceHref(parts[j]);
                const crt = <MarkdownView markdown={parts[j] || ''} options={CONVERTER_OPTIONS} components={{ CustomLink, CustomH }} />;
                cells.push(<TableCell sx={styles.tableCell} key={`cell${i}_${j}`}>{crt}</TableCell>);
            }

            rows.push(<TableRow style={styles.tableRow} key={`row${i}`}>{cells}</TableRow>);
        }
        return <Table key={`table_${key}`} size="small" style={styles.table}>
            <TableHead style={styles.tableHead}>
                <TableRow style={styles.tableRowHead}>
                    {header.map((h, i) =>
                        <TableCell sx={styles.tableCellHead} key={`header${i}`}>
                            <MarkdownView markdown={h} options={CONVERTER_OPTIONS} components={{ CustomLink, CustomH }} />
                        </TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody style={styles.tableBody}>{rows}</TableBody>
        </Table>;
    }

    render() {
        if (this.state.notFound) {
            return <Page404 language={this.props.language} />;
        }
        if (this.props.editMode && this.props.editor) {
            const Editor = this.props.editor;
            return <Editor
                language={this.props.language}
                mobile={this.props.mobile}
                theme={this.props.theme}
                path={this.state.header.editLink}
                onClose={() => this.props.onEditMode && this.props.onEditMode(false)}
            />;
        }
        if (this.state.loadTimeout && !this.state.parts.length) {
            return <Loader theme={this.props.theme} />;
        }

        const prefix = window.location.hash.split('?')[0];

        const CustomLink = this.customLink;
        const CustomH = this.customH;

        const reactElements = this.state.parts.map((part, i) => {
            if (part.type === 'table') {
                return this.renderTable(part.lines, i);
            }
            let line = part.lines.join('\n');
            if (part.type === 'code') {
                line = line.trim().replace(/^```javascript/, '```');
            }
            if (line.includes('*Number value')) {
                console.log('AAA');
            }
            const trimmed = line.trim();
            if (trimmed.match(/^\*[^\s]/) && trimmed.match(/[^\s]\*$/)) {
                line = trimmed;
            }

            // find all "[text](#link)" and replace it with <link text="text" link="link"/>
            // Detect "[iobroker repo \[repoName\]](#iobroker-repo)"

            line = Markdown.replaceHref(line);
            line = Markdown.makeHeadersAsLink(line, prefix);

            // replace <- with &lt;
            line = line.replace(/<-/g, '&lt;-');

            const rct = <MarkdownView markdown={line} options={CONVERTER_OPTIONS} components={{ CustomLink, CustomH }} />;

            if (part.type === 'warn') {
                return <Box key={`parts${i}`} sx={styles.warn}>{rct}</Box>;
            }
            if (part.type === 'alarm') {
                return <Box key={`parts${i}`} sx={styles.alarm}>{rct}</Box>;
            }
            if (part.type === 'notice') {
                return <Box key={`parts${i}`} sx={styles.notice}>{rct}</Box>;
            }
            if (part.type === '@@@') {
                return <Box key={`parts${i}`} sx={styles.todo}>{rct}</Box>;
            }

            return <div key={`parts${i}`} style={styles.paragraph}>{rct}</div>;
        });

        return <Box sx={styles.root} ref={this.contentRef}>
            {this.renderHeader()}
            {this.state.title && !this.state.header.adapter ? <h1>{this.state.title}</h1> : null}
            {this.renderAffiliates()}
            {reactElements}
            <hr />
            {this.renderLicense()}
            {this.renderChangeLog()}
            {this.renderInfo()}
            {this.renderContent()}
            {this.renderSnackbar()}
        </Box>;
    }
}

Markdown.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    rootPath:  PropTypes.string,
    path:  PropTypes.string,
    text:  PropTypes.string,
    editMode: PropTypes.bool,
    onEditMode: PropTypes.func,
    editEnabled:  PropTypes.bool,
    affiliates: PropTypes.func,
    editor: PropTypes.func,
};

export default Markdown;
