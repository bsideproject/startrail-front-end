import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main/Main';
import { Provider } from 'mobx-react';
import RootStore from './store/RootStore';
import Friend from "./pages/friend/Friend";
import Mind from './pages/mind/Mind';
import Detail from "./pages/detail/Detail";
import Setting from "./pages/setting/Setting";
import SettingNickname from "./pages/setting/SettingNickname";
import SettingOptIn from "./pages/setting/SettingOptIn";
import SettingTerms from "./pages/setting/SettingTerms";
import SettingWithdrawal from "./pages/setting/SettingWithdrawal";
import SettingTermDetail from './pages/setting/SettingTermDetail';

function App() {

    const [isMessageReceived, setMessageReceived] = useState<boolean>(false);

    // const jwtKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.ewogICJzZXF1ZW5jZSI6ICIxM2FhZmU3NS1hNzg1LTQwODItYWNhZC0xMTUyZDQwMzM0MzEiCn0.DOGXuAMyLiMCZbmp3om3yQ2MY3xFsNL3TQxeTcOPYxC9RG61OWmZ9rZvcptBsImwAEv2fUl-Mvku3hUzOgLdpg';

    // useEffect(() => {
    //     RootStore.userStore.setJwtKey(jwtKey);
    // }, [])

    useEffect(() => {

        const handleMessage = (event: any) => {
            if (!isMessageReceived) {

                setMessageReceived(true);
                window.removeEventListener('message', handleMessage);

                const data = event.data;

                RootStore.userStore.setJwtKey(data);
                sessionStorage.setItem('jwt', data);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        }

    }, [isMessageReceived]);

    return (
        <Provider RootStore={RootStore}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Main />}></Route>
                        <Route path='/page/main' element={<Main />}></Route>
                        <Route path="/page/friend" element={<Friend />}></Route>
                        <Route path="/page/relationship/" element={<Mind />}></Route>
                        <Route path="/page/relationship/:friendSequence/:nickname/:sequence" element={<Mind />}></Route>
                        <Route path="/page/detail" element={<Detail />}></Route>

                        <Route path="/page/setting" element={<Setting />}></Route>
                        <Route path="/page/setting/nickname" element={<SettingNickname />}></Route>
                        <Route path="/page/setting/optin" element={<SettingOptIn />}></Route>
                        <Route path="/page/setting/terms" element={<SettingTerms />}></Route>
                        <Route path="/page/setting/term/:index" element={<SettingTermDetail />}></Route>
                        <Route path="/page/setting/withdrawal" element={<SettingWithdrawal />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;
