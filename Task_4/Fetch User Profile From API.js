async function getUserProfile(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        console.log("Name:", user.name);
        console.log("Email:", user.email);

    } catch (error) {
        console.log("Error fetching user.");
    }
}

getUserProfile(1);