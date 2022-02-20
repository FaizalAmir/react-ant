import * as React from 'react';
// import { Redirect } from "react-router";
import {
    BrowserRouter,
    Route,
    Routes,
    // Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import SideNav from "../components/layouts/sidebar";

// import List from "../components/pages/list";
// import Form from "../components/pages/form";
// import File from "../components/pages/files";
// import Videos from "../components/pages/videos";

/* === Lebih baik gunain React lazy dan di usahain penamaan pages jangan sama kaya nama component di antd === */
const List = React.lazy(() => import('../components/pages/list'))
const Form = React.lazy(() => import('../components/pages/form'))
const File = React.lazy(() => import('../components/pages/files'))
const Videos = React.lazy(() => import('../components/pages/videos'))

const { Header, Sider, Content } = Layout;


const ApplicationRoutes = () => {
    const [collapse, setCollapse] = React.useState(false);

    React.useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    }, []);

    const handleToggle = (event: any) => {
        event.preventDefault();
        // eslint-disable-next-line no-unused-expressions
        collapse ? setCollapse(false) : setCollapse(true);
    }

    return (
        <BrowserRouter>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapse}>
                    <SideNav />
                </Sider>
                <Layout>
                    <Header className="siteLayoutBackground" style={{ padding: 0, background: "#001529" }}>
                        {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: handleToggle,
                            style: { color: "#fff" }
                        })}
                    </Header>
                    <Content style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: "calc(100vh - 114px)",
                        background: "#fff"
                    }}>
                        <Routes>
                            {/* <Route path="list" element={<List />} />
                            <Route path="form" element={<Form />} />
                            <Route path="files" element={<File />} />
                            <Route path="videos" element={<Videos />} />
                            */}

                            {/* Kalau Pake React Lazy  */}
                            <Route path="*"
                                element={
                                    <React.Suspense fallback="Loading...">
                                        <List />
                                    </React.Suspense>
                                } />
                            <Route path="list"
                                element={
                                    <React.Suspense fallback="Loading...">
                                        <List />
                                    </React.Suspense>
                                } />
                            <Route path="form"
                                element={
                                    <React.Suspense fallback="Loading...">
                                        <Form />
                                    </React.Suspense>
                                } />
                            <Route path="files"
                                element={
                                    <React.Suspense fallback="Loading...">
                                        <File />
                                    </React.Suspense>
                                } />
                            <Route path="videos"
                                element={
                                    <React.Suspense fallback="Loading...">
                                        <Videos />
                                    </React.Suspense>
                                } />
                        </Routes>
                        {/* <Navigate to="list" /> */}

                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default ApplicationRoutes;