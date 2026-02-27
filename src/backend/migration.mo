import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";

module {
  // Types that have changed since the last version

  type OldActor = {
    userProfiles : Map.Map<Principal, {
      name : Text;
      education : Text;
      stream : Text;
    }>;
    userAssessments : Map.Map<Principal, List.List<{
      technicalScore : Nat;
      creativeScore : Nat;
      businessScore : Nat;
      medicalScore : Nat;
      governmentScore : Nat;
      researchScore : Nat;
      skillRatings : [{
        skillName : Text;
        userRating : Nat;
      }];
      topCareers : [Nat];
      timestamp : Int;
    }>>;
    userMilestones : Map.Map<Principal, List.List<{
      careerTitle : Text;
      year : Nat;
      taskText : Text;
      completed : Bool;
    }>>;
    nextCareerId : Nat;
    careersList : List.List<{
      id : Nat;
      title : Text;
      category : Text;
      description : Text;
      requiredSkills : [{
        skillName : Text;
        requiredLevel : Nat;
      }];
      educationPath : [Text];
      roadmapYears : [{
        year : Nat;
        tasks : [Text];
      }];
      salaryEntry : Text;
      salaryMid : Text;
      salarySenior : Text;
      topCompanies : [Text];
    }>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, {
      name : Text;
      education : Text;
      stream : Text;
    }>;
    userAssessments : Map.Map<Principal, List.List<{
      technicalScore : Nat;
      creativeScore : Nat;
      businessScore : Nat;
      medicalScore : Nat;
      governmentScore : Nat;
      researchScore : Nat;
      skillRatings : [{
        skillName : Text;
        userRating : Nat;
      }];
      topCareers : [Nat];
      timestamp : Int;
    }>>;
    userMilestones : Map.Map<Principal, List.List<{
      careerTitle : Text;
      year : Nat;
      taskText : Text;
      completed : Bool;
    }>>;
    nextCareerId : Nat;
    careersList : List.List<{
      id : Nat;
      title : Text;
      category : Text;
      description : Text;
      requiredSkills : [{
        skillName : Text;
        requiredLevel : Nat;
      }];
      educationPath : [Text];
      roadmapYears : [{
        year : Nat;
        tasks : [Text];
      }];
      salaryEntry : Text;
      salaryMid : Text;
      salarySenior : Text;
      topCompanies : [Text];
    }>;
    userReminders : Map.Map<Principal, List.List<{
      title : Text;
      description : Text;
      dueDate : Int;
      completed : Bool;
    }>>;
    userQuestionAttempts : Map.Map<Principal, List.List<{
      category : Text;
      score : Nat;
      total : Nat;
      timestamp : Int;
    }>>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      userReminders = Map.empty<Principal, List.List<{
        title : Text;
        description : Text;
        dueDate : Int;
        completed : Bool;
      }>>();
      userQuestionAttempts = Map.empty<Principal, List.List<{
        category : Text;
        score : Nat;
        total : Nat;
        timestamp : Int;
      }>>();
    };
  };
};
