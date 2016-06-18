characterArchetype =
{
    name: "character",
    label: "Character",
    data: [
        {
            name: "name", type: "text"
        },
        {
            name: "characteristics", type: "set", contents: "number",
            items: [
                {
                    name: "Intelligence", type: "number"
                },
                {
                    name: "Brawn", type: "number"
                },
                {
                    name: "Agility", type: "number"
                },
                {
                    name: "Cunning", type: "number"
                },
                {
                    name: "Willpower", type: "number"
                },
                {
                    name: "Presence", type: "number"
                }
            ]
        },
        {
            name: "skills", type: "set", contents: "number",
            items: [
                {
                    name: "Athletics", type: "number"
                },
                {
                    name: "Astrogation", type: "number"
                },
                {
                    name: "Medicine", type: "number"
                }
            ]
        },
        {
            name: "friends", type: "list", contents: "character", "is-arch": true
        }

    ],
    views: [
        {
            name: "main",
            size: "full",
            data: [
                {
                    direction: "row",
                    data: "name",
                    label: "Name"
                },
                {
                    direction: "col",
                    data: "characteristics",
                    label: "Characteristics"
                },
                {
                    direction: "row",
                    data: "skills",
                    label: "Skills"
                },
                {
                    direction: "row",
                    data: "friends",
                    label: "Friends"
                }
            ]
        },
        {
            name: "list",
            size: "row",
            data: [

                {
                    direction: "column",
                    float: "left",
                    data: "name"
                },
                {
                    direction: "column",
                    float: "right",
                    data: "$label"
                }


            ]
        }
    ]
};

characters = [
    {
        id: 1,
        name: "Character 1",
        characteristics: [2, 3, 3, 2, 3, 3],
        skills:[1, 1, 2],
        friends: []
    },
    {
        id: 2,
        name: "Character 2",
        characteristics: [4, 3, 3, 2, 3, 3],
        skills:[1, 1, 2],
        friends: [1]
    }
];