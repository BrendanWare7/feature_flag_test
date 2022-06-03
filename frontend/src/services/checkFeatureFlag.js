import axios from 'axios';

export async function checkFeatureFlag(flag) {
    const response = await axios.get('http://localhost:3011/features');
    return response.data[flag]?.enabled
}
