from menu import menu
from database import engine, Base

if __name__ == "__main__":
    # Set up sqlite db
    Base.metadata.create_all(bind=engine)

    print("Database tables created successfully!")
    menu()