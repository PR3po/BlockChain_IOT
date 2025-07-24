// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Data {
    // Creating our own data type to satisfy our device's needs
    struct Object {
        uint256 weight;
        uint256 bloodPressure;
        uint256 pulse;
        string name;
    }

    // mapping the smart contract database
    // First, a userID (uint256) is mapped to the user array of data where for each index (uint256) we have a data object (Object)
    mapping(uint256 => mapping(uint256 => Object)) public userDatas;

    // A mapping that keeps track of the number of data points in the database for a given user
    mapping(uint256 => uint256) public userListLength;

    constructor() {}

    // Function to add a new data entry to the user's list. Currently public for testing purposes
    function addObject(
        string memory _name,
        uint256 _weight,
        uint256 _bloodPressure,
        uint256 _pulse,
        uint256 userIndex
    ) public {
        uint256 currentIndex = userListLength[userIndex];

        Object memory newEntry = Object({
            weight: _weight,
            name: _name,
            bloodPressure: _bloodPressure,
            pulse: _pulse
        });

        userDatas[userIndex][currentIndex] = newEntry;

        userListLength[userIndex]++;
    }

    // Function to retreieve the data from a specific entry. Required user index and the index of the data point
    function getObject(
        uint256 dataIndex,
        uint256 userIndex
    ) public view returns (string memory, uint256, uint256, uint256) {
        require(dataIndex < userListLength[userIndex], "Index out of range");

        string memory returnName = userDatas[userIndex][dataIndex].name;
        uint256 returnWeight = userDatas[userIndex][dataIndex].weight;
        uint256 returnPulse = userDatas[userIndex][dataIndex].pulse;
        uint256 returnBloodPressure = userDatas[userIndex][dataIndex].bloodPressure;

        return (returnName, returnWeight, returnBloodPressure, returnPulse);
    }

    // Function that given a user's index returns the amount of data that this user has stored in the smart contract
    function getListLength(uint256 userIndex) public view returns (uint256) {
        return userListLength[userIndex];
    }
}
