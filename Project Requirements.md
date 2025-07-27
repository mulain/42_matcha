# 42 Matcha

## Project Summary

A dating website that facilitates connections between potential partners, covering the entire process from registration to the final meeting.


## Mandatory Features

### 1. Registration and Signing-in
- **User Registration**: Email, username, last name, first name, secure password
- **Password Requirements**: Cannot use commonly used English words
- **Email Verification**: Unique link sent after registration
- **Login**: Username and password authentication
- **Password Reset**: Email-based password recovery
- **Logout**: Single-click logout from any page

### 2. User Profile
- **Required Information**:
  - Gender
  - Sexual preferences
  - Biography
  - Interest tags (reusable, e.g., #vegan, #geek, #piercing)
  - Up to 5 pictures (1 designated as profile picture)
- **Profile Management**:
  - Modify all information at any time
  - Update personal details (name, email)
  - View profile visitors and likers
  - Fame rating system
- **Location Services**:
  - GPS positioning down to neighborhood
  - Fallback location method if GPS disabled
  - Manual GPS location adjustment option

### 3. Browsing
- **Intelligent Profile Suggestions** based on:
  - Sexual orientation matching (heterosexual, homosexual, bisexual)
  - Proximity to user's geographical location
  - Highest number of shared tags
  - Highest fame rating
- **Priority**: Users within same geographical area
- **Sorting Options**: Age, location, fame rating, common tags
- **Filtering**: Age, location, fame rating, common tags

### 4. Research
- **Advanced Search Criteria**:
  - Specific age range
  - Fame rating range
  - Location
  - One or multiple interest tags
- **Results**: Sortable and filterable by age, location, fame rating, interest tags

### 5. Profile View
- **Profile Display**: All information except email and password
- **Visit Tracking**: Recorded in visit history
- **Interaction Features**:
  - Like/unlike profile pictures (requires own profile picture)
  - Check fame rating
  - View online status and last connection time
  - Report fake accounts
  - Block users
- **Connection Status**: Clear visibility of mutual likes and connections

### 6. Chat
- **Real-time Chat**: For mutually connected users (both liked each other)
- **Performance**: Maximum 10-second delay
- **Implementation**: Choice of technology (WebSocket, Server-Sent Events, etc.)

### 7. Notifications
- **Real-time Notifications** (maximum 10-second delay) for:
  - New likes received
  - Profile views
  - New messages
  - Mutual connections (both users liked each other)
  - Unlikes from connected users
- **Global Visibility**: Unread notifications visible from any page

## Technical Requirements

### Framework Constraints
- **Micro-framework Only**: Router and templating allowed, but NO:
  - ORM (Object-Relational Mapping)
  - Validators
  - User Account Manager

### Database Requirements
- **Type**: Relational or graph-oriented database
- **Options**: MySQL, MariaDB, PostgreSQL, Cassandra, InfluxDB, Neo4j
- **Data**: Minimum 500 distinct profiles
- **Queries**: Manual query creation (no ORM)

### Frontend Requirements
- **UI Libraries**: React, Angular, Vue, Bootstrap, Semantic (or combinations)
- **Browser Compatibility**: Latest Firefox and Chrome
- **Mobile-Friendly**: Acceptable layout on smaller screens
- **Layout**: Well-structured with header, main section, and footer

### Security Requirements
- **No Errors**: Zero errors, warnings, or notices (server-side and client-side)
- **Password Security**: No plain-text storage
- **Injection Protection**: 
  - SQL injection prevention
  - HTML/JavaScript injection protection
- **File Upload Security**: Unauthorized content prevention
- **Input Validation**: All forms properly validated
- **Environment Variables**: All credentials in .env file (excluded from Git)

## Bonus Features
*Only evaluated if mandatory part is perfect*

- **OmniAuth Strategies**: Additional authentication methods
- **Photo Gallery**: Drag-and-drop upload with image editing (crop, rotate, filters)
- **Interactive Map**: Precise GPS localization via JavaScript
- **Video/Audio Chat**: For connected users
- **Date Planning**: Schedule and organize real-life dates/events

## Evaluation Criteria

### Peer-Evaluation Standards
- **Code Quality**: No errors, warnings, or notices
- **Security**: Any security breach results in score of 0
- **Functionality**: All mandatory features must work perfectly
- **Documentation**: Proper folder and file naming

### Success Definition
- **Perfect Implementation**: All mandatory features fully functional
- **Security Compliance**: All security measures implemented
- **User Experience**: Smooth, intuitive interface
- **Performance**: Real-time features within specified delays
