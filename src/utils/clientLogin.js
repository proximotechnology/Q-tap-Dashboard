import axios from "axios";
import { toast } from "react-toastify";

export const handleClientLogin = async ({pin,setIsLoading,setBranches,setSelectedBranch,navigate ,t , role}) => {
        const data = {
            email: localStorage.getItem('clientEmail'),
            password: localStorage.getItem('clientPassword'),
            user_type: 'qtap_clients',
            role,
            pin
        }
        try {
            setIsLoading(true);
            const response = await axios.post(
                'https://highleveltecknology.com/Qtap/api/login',
                data,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('API Response:', response.data); // Debug log 
            localStorage.removeItem('clientPassword')
            // save loged in user data
            if (response?.data?.user) {
                localStorage.setItem('clientToken', response.data.token);
                localStorage.setItem('allClientData', JSON.stringify(response.data));
                localStorage.setItem("clientName", response.data.user.name);
                localStorage.setItem("clientEmail", response.data.user.email);

                //   Store branches in both context and localStorage
                if (response?.data?.brunches && response.data.brunches.length > 0) {
                    setBranches(response.data.brunches);
                    localStorage.setItem('branches', JSON.stringify(response.data.brunches));
                    // Set and store the first branch as default
                    setSelectedBranch(response.data.brunches[0].id);
                    localStorage.setItem('selectedBranch', response.data.brunches[0].id);
                }
            }
            console.log('success login',response)
            navigate('/dashboard-client')
        } catch (err) {
            console.log(err)
            toast.error(t('loginFaild'))
            navigate('/')
        } finally {
            setIsLoading(false);
        }
    }