const supabase = require('../db');

// Get all accomodations visible to students
const getAllAccomodations = async (studentId) => {
    try {
        // Fetch all accomodations

        const { data, error } = await supabase
            .rpc('get_accommodation_details', {
                students_or_externals_id_param: studentId
            })
        if (error) {
            console.error(error);
            throw error;
        }
        return data;

    }
    catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Insert a new allocation
const insertAllocation = async (studentId, accomodationId) => {
    try {
        // Insert the allocation
        const { data, error } = await supabase
            .from('allocation')
            .insert([{ students_or_externals_id: studentId, accommodation_id: accomodationId }])
            .select('*')
            .single();

        if (error) {
            console.error(error);
            throw error;
        }


        return data;
    }
    catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = {
    getAllAccomodations,
    insertAllocation
};
