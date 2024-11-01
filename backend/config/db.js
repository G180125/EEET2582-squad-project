require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mockData = require('./mock-data/mock-data'); 

// Import Models
const User = require('../module/user/user');
const Charity = require('../module/charity/charity');
const Donor = require('../module/donor/donor');
const Country = require('../module/country/country');
const Project = require('../module/project/project');

// Connect to the DB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://viphilongnguyen:bu6tLDBzcTbNYwFb@charitan.shpum.mongodb.net/?retryWrites=true&w=majority&appName=Charitan");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Initialize Data
const initializeData = async () => {
  try {
    // Check if there are any users
    const userCount = await User.countDocuments();
    const charityCount = await Charity.countDocuments();
    const donorCount = await Donor.countDocuments();
    const countryCount = await Country.countDocuments();
    const projectCount = await Project.countDocuments();
    if (userCount > 0 && charityCount < 6 && donorCount < 30 && countryCount < 5 && projectCount < 7 ) {
      console.log('Database already populated');
      return;
    }

    await User.deleteMany();
    await Charity.deleteMany();
    await Donor.deleteMany();
    await Country.deleteMany();
    await Project.deleteMany();
    
    console.log('Database is empty. Populating initial data...');

    // Create ADMIN
    const admin = new User({
      email: mockData.admin.email,
      password: await bcrypt.hash(mockData.admin.password, 10),
      role: mockData.admin.role,
    });
    await admin.save();

    // Create CHARITY organization accounts
    const charityDocs = await Promise.all(
      mockData.charities.map(async (charity) => {
        const charityUser = new User({
          email: `${charity.companyName.replace(' ', '').toLowerCase()}@example.com`,
          password: await bcrypt.hash('charitypassword', 10),
          role: 'Charity', 
        });
        await charityUser.save();

        return new Charity({
          user: charityUser._id,
          companyName: charity.companyName,
          address: `${charity.companyName} Address`,
          taxCode: `TAX${Math.floor(Math.random() * 10000)}`,
          type: charity.type,
        }).save();
      })
    );

    // Create COUNTRIES
    const countryDocs = await Promise.all(
      mockData.donorCountries.map(async (countryName) => {
        const country = new Country({ name: countryName });
        return await country.save();
      })
    );

    // Create 30 DONORS
    const donors = [];

    for (const country of mockData.donorCountries) {
      for (let i = 0; i < 5; i++) {
        const donorUser = new User({
          email: `${country.toLowerCase()}donor${i}@example.com`,
          password: await bcrypt.hash('donorpassword', 10),
          role: 'Donor', 
        });
        await donorUser.save();

        const donor = new Donor({
          user: donorUser._id,
          firstName: `First${i}`,
          lastName: `Last${i}`,
          address: `${country} Address ${i}`,
        });
        donors.push(await donor.save());
      }
    }

    // Create Global Crisis CHARITY PROJECTS
    const globalProjects = mockData.globalProjects.map((project) => {
      const charity = charityDocs.find(c => c.companyName === project.charityCompanyName);
      return {
        title: project.title,
        description: project.description,
        duration: project.duration,
        goalAmount: project.goalAmount,
        charity: charity._id,
        status: 'pending',
      };
    });

    await Project.insertMany(globalProjects);

    // Create Local CHARITY PROJECTS
    const localProjects = mockData.localProjects.map((project) => {
      const charity = charityDocs.find(c => c.companyName === project.charityCompanyName);
      return {
        title: project.title,
        description: project.description,
        duration: project.duration,
        goalAmount: project.goalAmount,
        charity: charity._id,
        status: 'pending',
      };
    });

    await Project.insertMany(localProjects);

    console.log('Initial data population complete.');
  } catch (error) {
    console.error('Error initializing data:', error);
  } finally {
    // mongoose.connection.close();
  }
};

module.exports = { connectDB, initializeData };
