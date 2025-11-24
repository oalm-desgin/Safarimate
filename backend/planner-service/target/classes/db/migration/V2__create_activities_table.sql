CREATE TABLE activities (
    id VARCHAR(36) PRIMARY KEY,
    trip_id VARCHAR(36) NOT NULL,
    name VARCHAR(200) NOT NULL,
    notes VARCHAR(1000),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    location_name VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_activity_trip FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    CONSTRAINT chk_activity_times CHECK (end_time >= start_time)
);

CREATE INDEX idx_activity_trip_id ON activities(trip_id);
CREATE INDEX idx_activity_start_time ON activities(start_time);

