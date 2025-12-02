// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Certificate} from "./Certificate.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Chaintificate
 * @dev Factory contract untuk membuat certificate NFT contracts
 * Hanya institusi yang terdaftar yang dapat membuat sertifikat baru
 */
contract Chaintificate is Ownable {
    // Mapping untuk menyimpan institusi yang terdaftar
    mapping(address => bool) public registeredInstitutions;
    
    // Mapping untuk menyimpan certificate contracts yang dibuat oleh institusi
    mapping(address => address[]) public institutionCertificates;
    
    // Array untuk menyimpan semua certificate contracts
    address[] public allCertificates;
    
    // Events
    event InstitutionRegistered(address indexed institution);
    event InstitutionUnregistered(address indexed institution);
    event CertificateCreated(
        address indexed institution,
        address indexed certificateContract,
        string certificateName,
        string symbol
    );
    
    // Modifiers
    modifier onlyRegisteredInstitution() {
        require(
            registeredInstitutions[msg.sender],
            "Only registered institutions can call this function"
        );
        _;
    }
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Mendaftarkan institusi baru
     * @param _institution Address institusi yang akan didaftarkan
     */
    function registerInstitution(address _institution) external onlyOwner {
        require(_institution != address(0), "Invalid institution address");
        require(!registeredInstitutions[_institution], "Institution already registered");
        
        registeredInstitutions[_institution] = true;
        emit InstitutionRegistered(_institution);
    }
    
    /**
     * @dev Membatalkan registrasi institusi
     * @param _institution Address institusi yang akan dibatalkan registrasinya
     */
    function unregisterInstitution(address _institution) external onlyOwner {
        require(registeredInstitutions[_institution], "Institution not registered");
        
        registeredInstitutions[_institution] = false;
        emit InstitutionUnregistered(_institution);
    }
    
    /**
     * @dev Membuat certificate contract baru
     * @param _certificateName Nama certificate (contoh: "University Degree Certificate")
     * @param _symbol Symbol certificate (contoh: "UDC")
     * @return Address dari certificate contract yang baru dibuat
     */
    function createCertificate(
        string memory _certificateName,
        string memory _symbol
    ) external onlyRegisteredInstitution returns (address) {
        // Deploy contract Certificate baru dengan institusi sebagai owner
        Certificate newCertificate = new Certificate(
            msg.sender,
            _certificateName,
            _symbol
        );
        
        address certificateAddress = address(newCertificate);
        
        // Simpan reference ke certificate contract
        institutionCertificates[msg.sender].push(certificateAddress);
        allCertificates.push(certificateAddress);
        
        emit CertificateCreated(
            msg.sender,
            certificateAddress,
            _certificateName,
            _symbol
        );
        
        return certificateAddress;
    }
    
    /**
     * @dev Mendapatkan semua certificate contracts yang dibuat oleh institusi
     * @param _institution Address institusi
     * @return Array of certificate contract addresses
     */
    function getInstitutionCertificates(address _institution)
        external
        view
        returns (address[] memory)
    {
        return institutionCertificates[_institution];
    }
    
    /**
     * @dev Mendapatkan total certificate contracts yang dibuat oleh institusi
     * @param _institution Address institusi
     * @return Jumlah certificate contracts
     */
    function getInstitutionCertificateCount(address _institution)
        external
        view
        returns (uint256)
    {
        return institutionCertificates[_institution].length;
    }
    
    /**
     * @dev Mendapatkan semua certificate contracts
     * @return Array of all certificate contract addresses
     */
    function getAllCertificates() external view returns (address[] memory) {
        return allCertificates;
    }
    
    /**
     * @dev Mendapatkan total semua certificate contracts
     * @return Total jumlah certificate contracts
     */
    function getTotalCertificates() external view returns (uint256) {
        return allCertificates.length;
    }
    
    /**
     * @dev Mengecek apakah address adalah institusi terdaftar
     * @param _institution Address yang akan dicek
     * @return Boolean status registrasi
     */
    function isRegisteredInstitution(address _institution)
        external
        view
        returns (bool)
    {
        return registeredInstitutions[_institution];
    }
}