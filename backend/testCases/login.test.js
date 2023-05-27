const request = require('supertest');
const app = require('../your-express-app'); // Replace with the path to your Express app file
const ActiveDonor = require('../models/ActiveDonorModel');

// Mock the ActiveDonor model for testing
jest.mock('../models/ActiveDonorModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
}));

describe('Backend API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /apply/:id', () => {
    it('should create a new ActiveDonor instance and return success message', async () => {
      // Mock the request parameters and body
      const req = {
        params: { id: 'user-id' },
        body: {
          weight: 60,
          Pulse: 70,
          Hb: 12,
          Bp: 120,
          Temperature: 98.6,
          hasDonated: true,
          donatedDate: '2023-05-27',
          hasTattoo: false,
          hasEarPiercing: true,
          fileName: 'medical-document.txt',
        },
      };

      // Mock the ActiveDonor instance and its save method
      const saveMock = jest.fn();
      ActiveDonor.mockImplementation(() => ({
        save: saveMock,
      }));

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .post('/apply/user-id')
        .send(req.body)
        .expect(200, { message: 'Application submitted successfully' });

      // Verify that the ActiveDonor instance is created with the correct data
      expect(ActiveDonor).toHaveBeenCalledWith({
        weight: 60,
        Pulse: 70,
        Hb: 12,
        Bp: 120,
        Temperature: 98.6,
        hasDonated: true,
        donatedDate: '2023-05-27',
        hasTattoo: false,
        hasEarPiercing: true,
        userId: 'user-id',
        medicalDocument: 'medical-document.txt',
      });

      // Verify that the ActiveDonor instance's save method is called
      expect(saveMock).toHaveBeenCalled();

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Application submitted successfully' });
    });

    it('should return an error if the ActiveDonor instance fails to save', async () => {
      // Mock the request parameters and body
      const req = {
        params: { id: 'user-id' },
        body: {
          weight: 60,
          Pulse: 70,
          Hb: 12,
          Bp: 120,
          Temperature: 98.6,
          hasDonated: true,
          donatedDate: '2023-05-27',
          hasTattoo: false,
          hasEarPiercing: true,
          fileName: 'medical-document.txt',
        },
      };

      // Mock the ActiveDonor instance and its save method to throw an error
      const saveMock = jest.fn().mockRejectedValue(new Error('Database error'));
      ActiveDonor.mockImplementation(() => ({
        save: saveMock,
      }));

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .post('/apply/user-id')
        .send(req.body)
        .expect(500, { error: 'Internal server error' });

      // Verify that the ActiveDonor instance's save method is called
      expect(saveMock).toHaveBeenCalled();

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('GET /apply', () => {
    it('should retrieve all ActiveDonor documents and return them as JSON', async () => {
      // Mock the ActiveDonor model's find method to return an array of documents
      const mockDocuments = [{ id: '1', weight: 60 }, { id: '2', weight: 70 }];
      ActiveDonor.find.mockResolvedValue(mockDocuments);

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .get('/apply')
        .expect(200, mockDocuments);

      // Verify that the ActiveDonor model's find method is called
      expect(ActiveDonor.find).toHaveBeenCalled();

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDocuments);
    });

    it('should return an error if retrieving ActiveDonor documents fails', async () => {
      // Mock the ActiveDonor model's find method to throw an error
      ActiveDonor.find.mockRejectedValue(new Error('Database error'));

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .get('/apply')
        .expect(500, { error: 'Internal server error' });

      // Verify that the ActiveDonor model's find method is called
      expect(ActiveDonor.find).toHaveBeenCalled();

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('GET /apply/:id', () => {
    it('should retrieve a specific ActiveDonor document and return it as JSON', async () => {
      // Mock the request parameter
      const req = { params: { id: 'document-id' } };

      // Mock the ActiveDonor model's findById method to return a document
      const mockDocument = { id: 'document-id', weight: 60 };
      ActiveDonor.findById.mockResolvedValue(mockDocument);

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .get('/apply/document-id')
        .expect(200, mockDocument);

      // Verify that the ActiveDonor model's findById method is called with the correct ID
      expect(ActiveDonor.findById).toHaveBeenCalledWith('document-id');

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDocument);
    });

    it('should return an error if the specified ActiveDonor document is not found', async () => {
      // Mock the request parameter
      const req = { params: { id: 'document-id' } };

      // Mock the ActiveDonor model's findById method to return null
      ActiveDonor.findById.mockResolvedValue(null);

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .get('/apply/document-id')
        .expect(404, { error: 'Application not found' });

      // Verify that the ActiveDonor model's findById method is called with the correct ID
      expect(ActiveDonor.findById).toHaveBeenCalledWith('document-id');

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Application not found' });
    });

    it('should return an error if retrieving the ActiveDonor document fails', async () => {
      // Mock the request parameter
      const req = { params: { id: 'document-id' } };

      // Mock the ActiveDonor model's findById method to throw an error
      ActiveDonor.findById.mockRejectedValue(new Error('Database error'));

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .get('/apply/document-id')
        .expect(500, { error: 'Internal server error' });

      // Verify that the ActiveDonor model's findById method is called with the correct ID
      expect(ActiveDonor.findById).toHaveBeenCalledWith('document-id');

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('DELETE /apply/:id', () => {
    it('should delete a specific ActiveDonor document and return success message', async () => {
      // Mock the request parameter
      const req = { params: { id: 'document-id' } };

      // Mock the ActiveDonor model's findByIdAndDelete method to return the deleted document
      const mockDocument = { id: 'document-id', weight: 60 };
      ActiveDonor.findByIdAndDelete.mockResolvedValue(mockDocument);

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .delete('/apply/document-id')
        .expect(200, { message: 'Application deleted successfully' });

      // Verify that the ActiveDonor model's findByIdAndDelete method is called with the correct ID
      expect(ActiveDonor.findByIdAndDelete).toHaveBeenCalledWith('document-id');

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Application deleted successfully' });
    });

    it('should return an error if the specified ActiveDonor document is not found', async () => {
      // Mock the request parameter
      const req = { params: { id: 'document-id' } };

      // Mock the ActiveDonor model's findByIdAndDelete method to return null
      ActiveDonor.findByIdAndDelete.mockResolvedValue(null);

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .delete('/apply/document-id')
        .expect(404, { error: 'Application not found' });

      // Verify that the ActiveDonor model's findByIdAndDelete method is called with the correct ID
      expect(ActiveDonor.findByIdAndDelete).toHaveBeenCalledWith('document-id');

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Application not found' });
    });

    it('should return an error if deleting the ActiveDonor document fails', async () => {
      // Mock the request parameter
      const req = { params: { id: 'document-id' } };

      // Mock the ActiveDonor model's findByIdAndDelete method to throw an error
      ActiveDonor.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      // Mock the Express response object
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await request(app)
        .delete('/apply/document-id')
        .expect(500, { error: 'Internal server error' });

      // Verify that the ActiveDonor model's findByIdAndDelete method is called with the correct ID
      expect(ActiveDonor.findByIdAndDelete).toHaveBeenCalledWith('document-id');

      // Verify that the response status and JSON are called with the correct values
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});